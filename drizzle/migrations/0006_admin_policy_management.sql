-- 1. Admins/super_admins may update any policy (agents stay read-only)
CREATE POLICY "Admins update policies"
ON public.policies FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));

-- 2. Customers keep "Users update own policies" for legitimate edits, but a guard
--    trigger blocks them from changing sensitive fields (RLS policies combine, so
--    the admin policy above does not restrict the customer one on its own).
CREATE OR REPLACE FUNCTION public.guard_policy_sensitive_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin') THEN
    RETURN NEW;
  END IF;
  IF NEW.status IS DISTINCT FROM OLD.status
     OR NEW.monthly_premium IS DISTINCT FROM OLD.monthly_premium
     OR NEW.sum_assured IS DISTINCT FROM OLD.sum_assured
     OR NEW.policy_number IS DISTINCT FROM OLD.policy_number
     OR NEW.renewal_date IS DISTINCT FROM OLD.renewal_date
     OR NEW.start_date IS DISTINCT FROM OLD.start_date
     OR NEW.product_id IS DISTINCT FROM OLD.product_id
     OR NEW.provider_id IS DISTINCT FROM OLD.provider_id
     OR NEW.user_id IS DISTINCT FROM OLD.user_id
     OR NEW.type IS DISTINCT FROM OLD.type THEN
    RAISE EXCEPTION 'Only Limiel staff can change policy status, premium, cover amount, reference or dates. Please contact Limiel Insurance.';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER policies_guard_sensitive
BEFORE UPDATE ON public.policies
FOR EACH ROW EXECUTE FUNCTION public.guard_policy_sensitive_fields();

-- 3. Safe admin-only deletion: refuses when claims, payments or documents reference the policy
CREATE OR REPLACE FUNCTION public.admin_delete_policy(_policy_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_claims int;
  v_payments int;
  v_documents int;
BEGIN
  IF auth.uid() IS NULL OR NOT (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin')) THEN
    RAISE EXCEPTION 'Not authorized: only admins can delete policies.';
  END IF;

  -- Lock the policy row so no related record can be added concurrently
  PERFORM 1 FROM public.policies WHERE id = _policy_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Policy not found.';
  END IF;

  SELECT count(*) INTO v_claims FROM public.claims WHERE policy_id = _policy_id;
  SELECT count(*) INTO v_payments FROM public.payments WHERE policy_id = _policy_id;
  SELECT count(*) INTO v_documents FROM public.documents WHERE policy_id = _policy_id;

  IF v_claims > 0 OR v_payments > 0 OR v_documents > 0 THEN
    RAISE EXCEPTION 'POLICY_HAS_RELATED_RECORDS: This policy has % claim(s), % payment(s) and % document(s) and cannot be deleted. Change its status to Cancelled instead.', v_claims, v_payments, v_documents;
  END IF;

  DELETE FROM public.policies WHERE id = _policy_id;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_delete_policy(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_delete_policy(uuid) TO authenticated;
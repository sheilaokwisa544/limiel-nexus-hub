GRANT DELETE ON public.quote_requests TO authenticated;

CREATE POLICY "Admins delete quote requests"
ON public.quote_requests
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));
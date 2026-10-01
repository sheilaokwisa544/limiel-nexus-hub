CREATE TABLE public.support_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text,
  phone text,
  product text,
  status text NOT NULL DEFAULT 'new',
  follow_up_required boolean NOT NULL DEFAULT false,
  quote_requested boolean NOT NULL DEFAULT false,
  messages jsonb NOT NULL DEFAULT '[]'::jsonb,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_interaction_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.support_conversations TO authenticated;
GRANT ALL ON public.support_conversations TO service_role;
ALTER TABLE public.support_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff read support conversations" ON public.support_conversations FOR SELECT TO authenticated
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'super_admin') OR has_role(auth.uid(),'agent'));
CREATE POLICY "Staff update support conversations" ON public.support_conversations FOR UPDATE TO authenticated
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'super_admin') OR has_role(auth.uid(),'agent'))
  WITH CHECK (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'super_admin') OR has_role(auth.uid(),'agent'));
ALTER PUBLICATION supabase_realtime ADD TABLE public.support_conversations;
CREATE TABLE public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  product TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.quote_requests TO anon;
GRANT SELECT, INSERT ON public.quote_requests TO authenticated;
GRANT ALL ON public.quote_requests TO service_role;

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a quote request"
  ON public.quote_requests FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users read own quote requests"
  ON public.quote_requests FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Staff read all quote requests"
  ON public.quote_requests FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role) OR has_role(auth.uid(), 'agent'::app_role));

CREATE INDEX quote_requests_created_at_idx ON public.quote_requests (created_at DESC);
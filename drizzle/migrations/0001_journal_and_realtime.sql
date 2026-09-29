CREATE TABLE public.journal_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Guides',
  author text NOT NULL DEFAULT 'Limiel Insurance',
  featured_image_url text,
  published boolean NOT NULL DEFAULT false,
  published_at date,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.journal_articles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.journal_articles TO authenticated;
GRANT ALL ON public.journal_articles TO service_role;
ALTER TABLE public.journal_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published articles" ON public.journal_articles FOR SELECT TO anon, authenticated USING (published);
CREATE POLICY "Staff manage articles" ON public.journal_articles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'agent'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'agent'));
CREATE TRIGGER journal_touch BEFORE UPDATE ON public.journal_articles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Staff read favorites" ON public.favorites FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'super_admin') OR public.has_role(auth.uid(),'agent'));

ALTER PUBLICATION supabase_realtime ADD TABLE public.policies;
ALTER PUBLICATION supabase_realtime ADD TABLE public.payments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.claims;
ALTER PUBLICATION supabase_realtime ADD TABLE public.quote_requests;
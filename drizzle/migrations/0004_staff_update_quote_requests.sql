-- Allow staff to update quote request status and notes
GRANT UPDATE ON public.quote_requests TO authenticated;

CREATE POLICY "Staff update quote requests"
ON public.quote_requests
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role) OR has_role(auth.uid(), 'agent'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role) OR has_role(auth.uid(), 'agent'::app_role));
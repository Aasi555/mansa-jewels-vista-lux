-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  weight TEXT,
  carat TEXT,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for products (public read access for now)
CREATE POLICY "Anyone can view products" 
ON public.products 
FOR SELECT 
USING (true);

-- Admin can insert/update products (using the same admin user ID from Collection component)
CREATE POLICY "Admin can manage products" 
ON public.products 
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND user_id = '37d4154b-7e5e-4c99-9869-ac25d6845b76'::uuid
  )
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Create storage policies for product images
CREATE POLICY "Product images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Admin can upload product images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'product-images' 
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND user_id = '37d4154b-7e5e-4c99-9869-ac25d6845b76'::uuid
  )
);

CREATE POLICY "Admin can update product images" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'product-images' 
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND user_id = '37d4154b-7e5e-4c99-9869-ac25d6845b76'::uuid
  )
);

CREATE POLICY "Admin can delete product images" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'product-images' 
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND user_id = '37d4154b-7e5e-4c99-9869-ac25d6845b76'::uuid
  )
);

-- Insert sample products with existing images
INSERT INTO public.products (name, description, weight, carat, images) VALUES
('Mansa 6.170gm Gold Drops Earrings', 'Elegant gold drop earrings with intricate design', '6.170gm', '18K Gold', '{}'),
('Mansa 6.20gm Gold Drops Earrings', 'Beautiful gold drop earrings with traditional craftsmanship', '6.20gm', '916 Hallmark', '{}'),
('Mansa Pearl Earrings 8.490gm', 'Stunning pearl earrings with gold setting', '8.490gm', '22K Gold', '{}'),
('Mansa 8.60gm Gold Drops Earrings', 'Heavy gold drop earrings with premium finish', '8.60gm', '916 Hallmark', '{}'),
('Mansa 6.43gm Gold Drops Earrings', 'Classic gold drop earrings with timeless appeal', '6.43gm', '22K Gold', '{}'),
('Mansa 2.60gm Gold Drops Earrings', 'Delicate gold drop earrings perfect for daily wear', '2.60gm', '22K Gold', '{}');
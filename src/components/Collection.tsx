import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Video, Loader2 } from "lucide-react";
import ProductCarousel from "./ProductCarousel";
import ImageUpload from "./ImageUpload";
import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
const Collection = () => {
  const { products, loading, createProduct, updateProduct } = useProducts();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    weight: '',
    carat: '',
    images: [] as string[]
  });

  const handleCreateProduct = async () => {
    if (!newProduct.name.trim()) return;
    
    try {
      await createProduct(newProduct);
      setNewProduct({ name: '', description: '', weight: '', carat: '', images: [] });
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  const handleImagesUploaded = (urls: string[]) => {
    setNewProduct(prev => ({
      ...prev,
      images: [...prev.images, ...urls]
    }));
  };

  const removeImage = (indexToRemove: number) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const isAdmin = localStorage.getItem("sb-yexrnqyqooymelekgegc-auth-token") &&
    JSON.parse(localStorage.getItem("sb-yexrnqyqooymelekgegc-auth-token"))
      .user.id === "37d4154b-7e5e-4c99-9869-ac25d6845b76";

  return (
    <section id='collection' className='py-20 px-4'>
      <div className='container mx-auto max-w-6xl'>
        {/* Section Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-6xl font-playfair font-bold text-gold-gradient mb-6'>
            Our Exquisite Collection
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Discover our carefully curated collection of traditional and
            contemporary jewelry pieces, crafted with precision and adorned with
            the finest materials.
          </p>
        </div>

        {/* Collection Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading products...</span>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
            {products.map((product) => (
              <Card
                key={product.id}
                className='card-luxury group cursor-pointer hover:scale-105 transition-luxury'
              >
                <CardContent className='p-0'>
                  <div className='aspect-square bg-gradient-to-br from-muted/20 to-muted/40 rounded-t-xl relative overflow-hidden'>
                    <ProductCarousel
                      images={product.images}
                      productName={product.name}
                      className="h-full"
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'></div>
                  </div>
                  <div className='p-6'>
                    <h3 className='font-playfair font-semibold text-xl text-foreground mb-2'>
                      {product.name}
                    </h3>
                    <p className='text-muted-foreground mb-2'>
                      {product.description || `${product.carat} handcrafted jewelry piece`}
                    </p>
                    {product.weight && (
                      <p className='text-sm text-muted-foreground/70 mb-4'>
                        Weight: {product.weight} • {product.carat}
                      </p>
                    )}
                    <div className='flex justify-between items-center'>
                      <span className='text-primary font-semibold'>
                        Contact for Price
                      </span>
                      <Button variant='royal' size='sm'>
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Admin Section */}
        {isAdmin && (
          <div className='card-luxury p-8 text-center'>
            <h3 className='text-2xl font-playfair font-semibold text-foreground mb-4'>
              Product Management
            </h3>
            <p className='text-muted-foreground mb-6'>
              Upload and manage your jewelry product collection
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant='luxury'>
                    <Upload className='mr-2 h-5 w-5' />
                    Add New Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter product name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="weight">Weight</Label>
                        <Input
                          id="weight"
                          value={newProduct.weight}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, weight: e.target.value }))}
                          placeholder="e.g., 6.170gm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="carat">Carat/Type</Label>
                      <Input
                        id="carat"
                        value={newProduct.carat}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, carat: e.target.value }))}
                        placeholder="e.g., 22K Gold, 916 Hallmark"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Product description"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label>Product Images</Label>
                      <ImageUpload 
                        onImagesUploaded={handleImagesUploaded}
                        existingImages={newProduct.images}
                        maxImages={6}
                      />
                      
                      {newProduct.images.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          {newProduct.images.map((url, index) => (
                            <div key={index} className="relative">
                              <img src={url} alt={`Upload ${index + 1}`} className="w-full h-20 object-cover rounded" />
                              <Button
                                variant="destructive"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6"
                                onClick={() => removeImage(index)}
                              >
                                ×
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-4 justify-end">
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateProduct} disabled={!newProduct.name.trim()}>
                        Create Product
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button variant='royal'>
                <Video className='mr-2 h-5 w-5' />
                Bulk Upload
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Collection;

import { useState } from "react";
import { ChefHat, Store, Truck, Building2, MessageCircle, Eye, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { menuRecipes, MenuRecipe, CuisineCategory, getCategoryLabel, getDifficultyLabel, getDifficultyColor } from "@/data/menuInspiration";
import { generateWhatsAppLink } from "@/data/products";
import RecipeDetailModal from "./RecipeDetailModal";

const useCaseIcons: Record<string, React.ReactNode> = {
  "Cloud Kitchen": <Building2 className="w-3 h-3" />,
  "Restoran": <Store className="w-3 h-3" />,
  "Katering": <Truck className="w-3 h-3" />,
};

const MenuInspirationSection = () => {
  const [activeCategory, setActiveCategory] = useState<CuisineCategory | "all">("all");
  const [selectedRecipe, setSelectedRecipe] = useState<MenuRecipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredRecipes = activeCategory === "all" 
    ? menuRecipes 
    : menuRecipes.filter(recipe => recipe.category === activeCategory);

  const handleViewRecipe = (recipe: MenuRecipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <section id="inspirasi-menu" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <ChefHat className="w-4 h-4" />
            <span className="text-sm font-medium">Untuk Bisnis F&B</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Inspirasi Menu
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Menu bisnis dengan bumbu dan saus ALCHO untuk menjaga konsistensi rasa 
            dan efisiensi operasional dapur profesional Anda.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-10">
          <Tabs 
            value={activeCategory} 
            onValueChange={(value) => setActiveCategory(value as CuisineCategory | "all")}
            className="w-full max-w-md"
          >
            <TabsList className="grid w-full grid-cols-3 bg-muted">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Semua
              </TabsTrigger>
              <TabsTrigger 
                value="local"
                className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Lokal
              </TabsTrigger>
              <TabsTrigger 
                value="international"
                className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                Internasional
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badges on image */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <Badge 
                    variant="secondary" 
                    className="gap-1.5 bg-background/90 backdrop-blur-sm text-foreground shadow-sm"
                  >
                    {useCaseIcons[recipe.useCase]}
                    {recipe.useCase}
                  </Badge>
                  <Badge 
                    variant="outline"
                    className={`backdrop-blur-sm shadow-sm ${getDifficultyColor(recipe.difficulty)}`}
                  >
                    <Gauge className="w-3 h-3 mr-1" />
                    {getDifficultyLabel(recipe.difficulty)}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Menu Name */}
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {recipe.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                  {recipe.description}
                </p>

                {/* ALCHO Product Used */}
                <div className="pt-4 border-t border-border mb-4">
                  <p className="text-xs text-muted-foreground mb-1">Produk yang digunakan:</p>
                  <p className="text-sm font-medium text-primary">
                    {recipe.alchoProduct}
                  </p>
                </div>

                {/* View Recipe Button */}
                <Button 
                  variant="outline" 
                  className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  onClick={() => handleViewRecipe(recipe)}
                >
                  <Eye className="w-4 h-4" />
                  Lihat Resep
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" variant="outline" className="gap-2">
            <a href="#produk">
              Lihat Produk Terkait
            </a>
          </Button>
          <Button 
            asChild 
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white gap-2"
          >
            <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" />
              Order via WhatsApp
            </a>
          </Button>
        </div>
      </div>

      {/* Recipe Detail Modal */}
      <RecipeDetailModal 
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default MenuInspirationSection;

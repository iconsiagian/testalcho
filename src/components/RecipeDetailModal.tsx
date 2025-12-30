import { X, Clock, Users, ChefHat, Lightbulb, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MenuRecipe, getCategoryLabel } from "@/data/menuInspiration";
import { generateWhatsAppLink } from "@/data/products";

interface RecipeDetailModalProps {
  recipe: MenuRecipe | null;
  isOpen: boolean;
  onClose: () => void;
}

const RecipeDetailModal = ({ recipe, isOpen, onClose }: RecipeDetailModalProps) => {
  if (!recipe) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-xl md:max-w-2xl p-0 bg-background"
      >
        <ScrollArea className="h-full">
          {/* Hero Image */}
          <div className="relative h-56 md:h-72">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            
            {/* Badges on image */}
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                {getCategoryLabel(recipe.category)}
              </Badge>
              <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground">
                {recipe.useCase}
              </Badge>
            </div>

            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Header */}
            <SheetHeader className="space-y-2 text-left">
              <SheetTitle className="font-serif text-2xl md:text-3xl text-foreground">
                {recipe.name}
              </SheetTitle>
              <p className="text-muted-foreground leading-relaxed">
                {recipe.description}
              </p>
            </SheetHeader>

            {/* Quick Info */}
            <div className="grid grid-cols-3 gap-4 py-4 bg-muted/50 rounded-lg px-4">
              <div className="text-center">
                <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Prep</p>
                <p className="text-sm font-medium">{recipe.prepTime}</p>
              </div>
              <div className="text-center border-x border-border">
                <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Masak</p>
                <p className="text-sm font-medium">{recipe.cookTime}</p>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-xs text-muted-foreground">Porsi</p>
                <p className="text-sm font-medium">{recipe.servings}</p>
              </div>
            </div>

            {/* ALCHO Product Highlight */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <ChefHat className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Produk ALCHO</span>
              </div>
              <p className="font-semibold text-foreground">{recipe.alchoProduct}</p>
            </div>

            <Separator />

            {/* Ingredients */}
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">1</span>
                Bahan-Bahan
              </h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className={`flex justify-between items-center py-2 px-3 rounded-md ${
                      ingredient.isAlchoProduct 
                        ? "bg-primary/10 border border-primary/20" 
                        : "bg-muted/30"
                    }`}
                  >
                    <span className={`${ingredient.isAlchoProduct ? "font-medium text-primary" : "text-foreground"}`}>
                      {ingredient.item}
                      {ingredient.isAlchoProduct && (
                        <Badge variant="outline" className="ml-2 text-xs border-primary text-primary">
                          ALCHO
                        </Badge>
                      )}
                    </span>
                    <span className="text-muted-foreground text-sm">{ingredient.amount}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Steps */}
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">2</span>
                Langkah Pembuatan
              </h3>
              <ol className="space-y-4">
                {recipe.steps.map((step) => (
                  <li key={step.step} className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {step.step}
                    </span>
                    <p className="text-foreground leading-relaxed pt-0.5">{step.instruction}</p>
                  </li>
                ))}
              </ol>
            </div>

            <Separator />

            {/* Business Notes */}
            <div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">3</span>
                Tips Bisnis
              </h3>
              <div className="space-y-3">
                {recipe.businessNotes.map((note, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span className="font-medium text-foreground">{note.title}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 pb-6">
              <Button asChild variant="outline" className="flex-1">
                <a href="#produk" onClick={onClose}>
                  Lihat Produk Terkait
                </a>
              </Button>
              <Button 
                asChild 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                  Order via WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default RecipeDetailModal;

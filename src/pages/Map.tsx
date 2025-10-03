import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Search, 
  Filter, 
  Star, 
  Clock,
  Phone,
  Navigation,
  AlertTriangle,
  Wine,
  Camera,
  TreePine
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Attraction {
  id: string;
  name: string;
  category: string;
  status: "open" | "closed" | "warning";
  rating: number;
  distance: string;
  openUntil?: string;
  warning?: string;
  icon: any;
}

const attractions: Attraction[] = [
  {
    id: "1",
    name: "Vinícola Góes",
    category: "Vinho",
    status: "open",
    rating: 4.8,
    distance: "2.3 km",
    openUntil: "18:00",
    icon: Wine
  },
  {
    id: "2",
    name: "Parque Natural",
    category: "Natureza",
    status: "open",
    rating: 4.5,
    distance: "1.8 km",
    openUntil: "17:00",
    icon: TreePine
  },
  {
    id: "3",
    name: "Ski Mountain Park",
    category: "Aventura",
    status: "closed",
    rating: 0,
    distance: "5.2 km",
    warning: "Fechado permanentemente por questões de segurança",
    icon: AlertTriangle
  },
  {
    id: "4",
    name: "Centro Histórico",
    category: "Cultural",
    status: "open",
    rating: 4.3,
    distance: "0.8 km",
    openUntil: "19:00",
    icon: Camera
  }
];

export default function Map() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    
    if (search) {
      setSearchTerm(search);
    }
    if (category) {
      setSelectedCategory(category.toLowerCase());
    }
  }, [searchParams]);

  const handleCall = (name: string) => {
    toast({
      title: "Ligando...",
      description: `Conectando com ${name}`,
    });
  };

  const handleNavigate = (name: string) => {
    toast({
      title: "Abrindo navegação",
      description: `Traçando rota para ${name}`,
    });
  };

  const handleViewDetails = (name: string) => {
    toast({
      title: name,
      description: "Mostrando informações completas",
    });
  };

  const filteredAttractions = attractions.filter(attraction => {
    const matchesSearch = attraction.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || attraction.category.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case "open": return "success";
      case "closed": return "destructive";
      case "warning": return "warning";
      default: return "secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case "open": return "Aberto";
      case "closed": return "Fechado";
      case "warning": return "Atenção";
      default: return "Desconhecido";
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mapa de Atrações</h1>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => {
            toast({
              title: "GPS Ativado",
              description: "Localizando sua posição atual",
            });
          }}
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar atrações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={selectedCategory === "all" ? "wine" : "outline"} 
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            Todos
          </Button>
          <Button 
            variant={selectedCategory === "vinho" ? "wine" : "outline"} 
            size="sm"
            onClick={() => setSelectedCategory("vinho")}
          >
            Vinhos
          </Button>
          <Button 
            variant={selectedCategory === "natureza" ? "nature" : "outline"} 
            size="sm"
            onClick={() => setSelectedCategory("natureza")}
          >
            Natureza
          </Button>
          <Button 
            variant={selectedCategory === "cultural" ? "secondary" : "outline"} 
            size="sm"
            onClick={() => setSelectedCategory("cultural")}
          >
            Cultural
          </Button>
        </div>
      </div>

      {/* Map Placeholder */}
      <Card>
       <CardContent className="p-0">
         <div className="rounded-lg overflow-hidden border border-border h-[450px]">
          <iframe
        src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d58526.88810654159!2d-47.13258695!3d-23.53500175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x94cf6d59afefc30f%3A0x945ea22d68b95c8b!2sGateway%20of%20S%C3%A3o%20Roque%20-%20Av.%20Varangu%C3%A9ra%20-%20Vila%20Sao%20Domingos%2C%20S%C3%A3o%20Roque%20-%20SP%2C%2018132-370!3m2!1d-23.5125527!2d-47.1428844!5e0!3m2!1sfil!2sbr!4v1759423796982!5m2!1sfil!2sbr"
        title="Mapa Interativo — São Roque"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="w-full h-full"
        />
         </div>
       </CardContent>
      </Card>

      {/* Attractions List */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Atrações Próximas</h2>
        {filteredAttractions.map((attraction) => {
          const Icon = attraction.icon;
          return (
            <Card key={attraction.id} className="hover:shadow-wine transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{attraction.name}</h3>
                        <p className="text-sm text-muted-foreground">{attraction.category}</p>
                      </div>
                      <Badge variant={getStatusColor(attraction.status) as any}>
                        {getStatusText(attraction.status)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Navigation className="h-3 w-3" />
                        <span>{attraction.distance}</span>
                      </div>
                      
                      {attraction.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-warning" />
                          <span>{attraction.rating}</span>
                        </div>
                      )}
                      
                      {attraction.openUntil && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>até {attraction.openUntil}</span>
                        </div>
                      )}
                    </div>
                    
                    {attraction.warning && (
                      <div className="p-2 bg-warning/10 border border-warning/20 rounded-md">
                        <p className="text-sm text-warning">{attraction.warning}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="wine" 
                        size="sm"
                        onClick={() => handleViewDetails(attraction.name)}
                      >
                        Ver Detalhes
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCall(attraction.name)}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Contato
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
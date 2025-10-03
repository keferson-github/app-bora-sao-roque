import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wine, 
  Star, 
  Clock,
  Phone,
  MapPin,
  AlertTriangle,
  Users,
  DollarSign,
  Calendar,
  Navigation
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const wineries = [
  {
    id: "1",
    name: "Vinícola Góes",
    rating: 4.8,
    reviews: 124,
    distance: "2.3 km",
    openUntil: "18:00",
    status: "open",
    price: "R$ 45",
    specialty: "Cabernet Sauvignon",
    capacity: "Até 15 pessoas",
    booking: "Recomendado"
  },
  {
    id: "2",
    name: "Casa do Vinho",
    rating: 4.6,
    reviews: 89,
    distance: "3.1 km",
    openUntil: "17:30",
    status: "open",
    price: "R$ 38",
    specialty: "Chardonnay",
    capacity: "Até 20 pessoas",
    booking: "Obrigatório"
  },
  {
    id: "3",
    name: "Quinta do Vale",
    rating: 4.9,
    reviews: 67,
    distance: "4.5 km",
    openUntil: "19:00",
    status: "warning",
    price: "R$ 55",
    specialty: "Merlot Premium",
    capacity: "Até 12 pessoas",
    booking: "Disponível",
    warning: "Acesso limitado devido a obras na estrada"
  }
];

const experiences = [
  {
    title: "Degustação Clássica",
    duration: "1h30min",
    price: "R$ 45",
    description: "Degustação de 5 vinhos com acompanhamentos locais"
  },
  {
    title: "Tour Completo",
    duration: "3h",
    price: "R$ 85",
    description: "Visita à vinícola + degustação + almoço típico"
  },
  {
    title: "Experiência Premium",
    duration: "4h",
    price: "R$ 150",
    description: "Tour VIP com sommelier + vinhos especiais + jantar"
  }
];

export default function WineRoute() {
  const [selectedRoute, setSelectedRoute] = useState<string[]>([]);

  const handleBooking = (name: string) => {
    toast({
      title: "Reserva iniciada",
      description: `Iniciando reserva para ${name}`,
    });
  };

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

  const handleSelectExperience = (title: string) => {
    toast({
      title: "Experiência selecionada",
      description: `${title} - Escolha uma vinícola para continuar`,
    });
  };

  const handleCreateRoute = () => {
    if (selectedRoute.length > 0) {
      toast({
        title: "Rota criada!",
        description: `Rota com ${selectedRoute.length} vinícolas salva`,
      });
    } else {
      toast({
        title: "Crie sua rota",
        description: "Adicione vinícolas à sua rota personalizada",
      });
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground shadow-wine">
        <h1 className="text-2xl font-bold mb-2">Rota do Vinho</h1>
        <p className="text-primary-foreground/90 mb-4">
          Descubra os melhores vinhos e vinícolas de São Roque
        </p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Wine className="h-4 w-4" />
            <span>12 Vinícolas Ativas</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>4.7 Avaliação Média</span>
          </div>
        </div>
      </div>

      {/* Legal Alert */}
      <Card className="border-warning bg-warning/10">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Atenção: Questões Legais em Andamento</p>
              <p className="text-xs text-muted-foreground mt-1">
                Algumas vinícolas podem ter restrições devido às novas regulamentações ambientais. 
                Verifique disponibilidade antes da visita.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="wineries" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="wineries">Vinícolas</TabsTrigger>
          <TabsTrigger value="experiences">Experiências</TabsTrigger>
          <TabsTrigger value="route">Minha Rota</TabsTrigger>
        </TabsList>

        <TabsContent value="wineries" className="space-y-4">
          {wineries.map((winery) => (
            <Card key={winery.id} className="hover:shadow-wine transition-all duration-200">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{winery.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-current text-warning" />
                          <span className="text-sm font-medium">{winery.rating}</span>
                          <span className="text-sm text-muted-foreground">({winery.reviews})</span>
                        </div>
                        <Badge variant={winery.status === "open" ? "success" : "warning"}>
                          {winery.status === "open" ? "Aberto" : "Atenção"}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{winery.price}</p>
                      <p className="text-xs text-muted-foreground">por pessoa</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-muted-foreground" />
                      <span>{winery.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>até {winery.openUntil}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wine className="h-4 w-4 text-muted-foreground" />
                      <span>{winery.specialty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{winery.capacity}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Reserva: {winery.booking}</span>
                  </div>

                  {winery.warning && (
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-md">
                      <p className="text-sm text-warning">{winery.warning}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="wine" 
                      className="flex-1"
                      onClick={() => handleBooking(winery.name)}
                    >
                      Reservar Agora
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleCall(winery.name)}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleNavigate(winery.name)}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="experiences" className="space-y-4">
          {experiences.map((experience, index) => (
            <Card key={index} className="hover:shadow-nature transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{experience.title}</span>
                  <Badge variant="secondary">{experience.price}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Duração: {experience.duration}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{experience.description}</p>
                  <Button 
                    variant="nature" 
                    className="w-full"
                    onClick={() => handleSelectExperience(experience.title)}
                  >
                    Escolher Experiência
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="route" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Minha Rota Personalizada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Wine className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
                  Crie sua rota personalizada selecionando vinícolas e experiências
                </p>
                <Button 
                  variant="hero"
                  onClick={handleCreateRoute}
                >
                  Criar Rota
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
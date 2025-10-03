import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { MapPin, Clock, AlertTriangle, Wine, Shield, Thermometer, Star, Camera, Navigation, Search, Menu, Bell } from "lucide-react";
const categoryCards = [{
  title: "Pontos Turísticos",
  icon: MapPin,
  description: "Descubra os melhores locais",
  status: "4 abertos agora",
  path: "/attractions",
  variant: "wine" as const
}, {
  title: "Rota do Vinho",
  icon: Wine,
  description: "Vinícolas e degustações",
  status: "12 vinícolas ativas",
  path: "/wine-route",
  variant: "nature" as const
}, {
  title: "Segurança",
  icon: Shield,
  description: "Informações de segurança",
  status: "Atualizado hoje",
  path: "/safety",
  variant: "secondary" as const
}];
const quickActions = [{
  label: "Mapa Interativo",
  icon: Navigation,
  path: "/map"
}, {
  label: "Clima Atual",
  icon: Thermometer,
  path: "/weather"
}, {
  label: "Emergência",
  icon: AlertTriangle,
  path: "/emergency"
}, {
  label: "Galeria",
  icon: Camera,
  path: "/gallery"
}];
export default function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/map?search=${encodeURIComponent(searchTerm)}`);
      toast({
        title: "Buscando...",
        description: `Procurando por "${searchTerm}"`
      });
    } else {
      toast({
        title: "Digite algo",
        description: "Digite o nome de um local para buscar",
        variant: "destructive"
      });
    }
  };
  const handleCategoryClick = (category: string) => {
    navigate(`/map?category=${category.toLowerCase()}`);
    toast({
      title: "Filtro aplicado",
      description: `Mostrando: ${category}`
    });
  };
  const handleAlertClick = () => {
    navigate("/alerts");
  };
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 pt-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            
            <div>
              <p className="text-gray-600 text-sm">Olá, Turista</p>
              <Badge variant="outline" className="bg-orange text-white border-orange text-xs px-2 py-1 -mb-4">
                Explorer
              </Badge>
            </div>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              3
            </span>
          </div>
        </div>

        {/* Hero Banner */}
        <Card className="bg-gradient-orange text-white border-0 shadow-lg mb-6">
          <CardContent className="p-6 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-white/90 text-sm mb-1">EXPLORE</p>
              <h1 className="text-2xl font-bold mb-1">São Roque</h1>
              <p className="text-white/90 text-sm mb-4">Rota do Vinho & Turismo</p>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mb-16"></div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Buscar destinos e explorar" className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-500 border-0 focus:ring-2 focus:ring-blue focus:bg-white transition-all" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} />
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
          <Button variant="nature" size="sm" className="flex-shrink-0 rounded-full px-4" onClick={() => handleCategoryClick("Pontos Turísticos")}>
            <MapPin className="w-4 h-4 mr-2" />
            Pontos Turísticos
          </Button>
          <Button variant="outline" size="sm" className="flex-shrink-0 rounded-full px-4" onClick={() => {
          navigate("/wine-route");
          toast({
            title: "Rota do Vinho",
            description: "Explorando vinícolas de São Roque"
          });
        }}>
            <Wine className="w-4 h-4 mr-2" />
            Vinícolas
          </Button>
          <Button variant="outline" size="sm" className="flex-shrink-0 rounded-full px-4" onClick={() => handleCategoryClick("Eventos")}>
            <Camera className="w-4 h-4 mr-2" />
            Eventos
          </Button>
          <Button variant="outline" size="sm" className="flex-shrink-0 rounded-full px-4" onClick={handleAlertClick}>
            <Shield className="w-4 h-4 mr-2" />
            Segurança
          </Button>
        </div>
      </header>

      {/* Alert Bar */}
      <div className="px-4 mb-6">
        <Card className="border-warning bg-warning/10 border-l-4 border-l-warning cursor-pointer hover:bg-warning/20 transition-colors" onClick={handleAlertClick}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-900">Ski Mountain Park</p>
                <p className="text-xs text-gray-600">Fechado permanentemente - questões de segurança</p>
              </div>
              <Button variant="outline" size="sm">Ver</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 space-y-6">
        {/* Featured Attractions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Destaques populares</h2>
            <Button variant="link" className="text-blue p-0" onClick={() => navigate("/map")}>
              Ver todos
            </Button>
          </div>
          
          <div className="space-y-4">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-wine to-wine-light rounded-t-xl"></div>
                <Badge className="absolute top-3 left-3 bg-orange text-white">
                  20% OFF
                </Badge>
                <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                  <Star className="w-4 h-4" />
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Vinícola Góes</h3>
                <p className="text-sm text-gray-600 mb-2">São Roque • Rota do Vinho</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <span className="text-sm font-medium ml-1">4.5</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-600">Degustação • Passeio</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-nature">R$ 45,00</span>
                    <span className="text-sm text-gray-400 line-through">R$ 60,00</span>
                  </div>
                  <Button variant="ghost" className="p-0 h-auto text-blue font-medium" onClick={() => {
                  navigate("/map");
                  toast({
                    title: "Abrindo mapa",
                    description: "Mostrando localização da Vinícola Góes"
                  });
                }}>
                    Ver mapa
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-nature to-nature-light rounded-t-xl"></div>
                <Badge className="absolute top-3 left-3 bg-blue text-white">
                  Destaque
                </Badge>
                <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 hover:bg-white">
                  <Star className="w-4 h-4" />
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">Centro Histórico</h3>
                <p className="text-sm text-gray-600 mb-2">São Roque • Centro</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <span className="text-sm font-medium ml-1">4.8</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-600">História • Arquitetura</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-nature">Gratuito</span>
                  <Button variant="ghost" className="p-0 h-auto text-blue font-medium" onClick={() => {
                  navigate("/map");
                  toast({
                    title: "Abrindo mapa",
                    description: "Mostrando localização do Centro Histórico"
                  });
                }}>
                    Ver mapa
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Stats */}
        <section>
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue">15+</p>
                  <p className="text-xs text-gray-600">Pontos Turísticos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-nature">12</p>
                  <p className="text-xs text-gray-600">Vinícolas Ativas</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange">4.6</p>
                  <p className="text-xs text-gray-600">Avaliação Média</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>;
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Thermometer, 
  ShieldX, 
  MapPin,
  Clock,
  Phone,
  Wind,
  Flame,
  Construction
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const criticalAlerts = [
  {
    id: "1",
    title: "Ski Mountain Park - Fechamento Permanente",
    description: "Atração fechada permanentemente após acidente fatal em 2024. Evite a área.",
    severity: "critical",
    location: "Zona Norte",
    timestamp: "Atualizado hoje",
    icon: ShieldX,
    actions: ["Ver Alternativas", "Contato"]
  },
  {
    id: "2", 
    title: "Mercadão Av. João Pessoa - Área Interditada",
    description: "Estabelecimento abandonado após desabamento parcial em 2023. Acesso restrito.",
    severity: "high",
    location: "Centro",
    timestamp: "2 dias atrás",
    icon: Construction,
    actions: ["Rotas Alternativas"]
  }
];

const environmentalAlerts = [
  {
    id: "3",
    title: "Qualidade do Ar - Moderada",
    description: "Risco de queimadas na região. Qualidade do ar pode estar comprometida.",
    severity: "medium",
    location: "Região Rural",
    timestamp: "6 horas atrás",
    icon: Wind,
    value: "IQA: 85"
  },
  {
    id: "4",
    title: "Temperatura Elevada",
    description: "Temperatura acima da média para a estação. Hidrate-se adequadamente.",
    severity: "low",
    location: "Toda a cidade",
    timestamp: "1 hora atrás", 
    icon: Thermometer,
    value: "32°C"
  },
  {
    id: "5",
    title: "Risco de Queimadas",
    description: "Época de seca aumenta risco de incêndios. Evite áreas florestais.",
    severity: "medium",
    location: "Áreas Rurais",
    timestamp: "4 horas atrás",
    icon: Flame,
    value: "Alto"
  }
];

const legalAlerts = [
  {
    id: "6",
    title: "Nova Lei de Condomínios de Lotes",
    description: "Mudanças nas regulamentações podem afetar algumas atrações da Rota do Vinho.",
    severity: "medium",
    location: "Rota do Vinho",
    timestamp: "1 semana atrás",
    icon: AlertTriangle,
    status: "Em discussão"
  },
  {
    id: "7",
    title: "Revisão do Plano Diretor",
    description: "Novas audiências públicas programadas após polêmicas e protestos.",
    severity: "low",
    location: "Município",
    timestamp: "2 semanas atrás",
    icon: MapPin,
    status: "Audiências marcadas"
  }
];

const getSeverityColor = (severity: string) => {
  switch(severity) {
    case "critical": return "destructive";
    case "high": return "warning";
    case "medium": return "secondary";
    case "low": return "outline";
    default: return "outline";
  }
};

const getSeverityText = (severity: string) => {
  switch(severity) {
    case "critical": return "Crítico";
    case "high": return "Alto";
    case "medium": return "Médio";
    case "low": return "Baixo";
    default: return "Info";
  }
};

export default function Alerts() {
  const navigate = useNavigate();

  const handleEmergencyCall = () => {
    toast({
      title: "Emergência 190",
      description: "Conectando com serviço de emergência",
    });
  };

  const handleAlertAction = (action: string) => {
    if (action.includes("Alternativas") || action.includes("Rotas")) {
      navigate("/map");
      toast({
        title: "Mostrando alternativas",
        description: "Visualizando rotas alternativas no mapa",
      });
    } else if (action.includes("Contato")) {
      toast({
        title: "Contato",
        description: "Abrindo informações de contato",
      });
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-card rounded-xl p-6 border-l-4 border-l-warning">
        <h1 className="text-2xl font-bold mb-2">Central de Alertas</h1>
        <p className="text-muted-foreground">
          Informações atualizadas sobre segurança, meio ambiente e regulamentações
        </p>
      </div>

      {/* Emergency Contact */}
      <Card className="border-destructive bg-destructive/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-destructive" />
            <div className="flex-1">
              <p className="font-medium">Emergência: 190 | Bombeiros: 193</p>
              <p className="text-sm text-muted-foreground">Guarda Municipal: (11) 4784-8080</p>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={handleEmergencyCall}
            >
              Ligar Agora
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="critical" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="critical">Críticos</TabsTrigger>
          <TabsTrigger value="environmental">Ambientais</TabsTrigger>
          <TabsTrigger value="legal">Legais</TabsTrigger>
        </TabsList>

        <TabsContent value="critical" className="space-y-4">
          {criticalAlerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <Card key={alert.id} className="border-destructive hover:shadow-elegant transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-destructive/10 rounded-lg">
                      <Icon className="h-5 w-5 text-destructive" />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{alert.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                        </div>
                        <Badge variant={getSeverityColor(alert.severity) as any}>
                          {getSeverityText(alert.severity)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {alert.actions.map((action, index) => (
                          <Button 
                            key={index} 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAlertAction(action)}
                          >
                            {action}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="environmental" className="space-y-4">
          {environmentalAlerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <Card key={alert.id} className="hover:shadow-nature transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{alert.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={getSeverityColor(alert.severity) as any}>
                            {getSeverityText(alert.severity)}
                          </Badge>
                          {alert.value && (
                            <p className="text-sm font-medium mt-1">{alert.value}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="legal" className="space-y-4">
          {legalAlerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <Card key={alert.id} className="hover:shadow-wine transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-secondary" />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{alert.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                        </div>
                        <Badge variant={getSeverityColor(alert.severity) as any}>
                          {getSeverityText(alert.severity)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>
                      
                      {alert.status && (
                        <div className="p-2 bg-muted rounded-md">
                          <p className="text-sm">Status: {alert.status}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}
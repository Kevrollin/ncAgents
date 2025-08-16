import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Rocket,
  Send,
  MessageCircle,
  Repeat,
  Power,
  StopCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  deployService,
  TelegramDeployment,
  DiscordDeployment,
  WebAppDeployment,
} from "@/services/deployService";
import { useNormalToast } from "@/hooks/use-normal-toast";
import { useDestructiveToast } from "@/hooks/use-destructive-toast";

const AgentDeploy = () => {
  const { id } = useParams();

  // Telegram state
  const [tgToken, setTgToken] = useState("");
  const [tgName, setTgName] = useState("");
  const [tgWebhook, setTgWebhook] = useState("");
  const [tgDeployments, setTgDeployments] = useState<TelegramDeployment[]>([]);

  // Discord state
  const [dcToken, setDcToken] = useState("");
  const [dcName, setDcName] = useState("");
  const [dcGuild, setDcGuild] = useState("");
  const [dcChannel, setDcChannel] = useState("");
  const [dcDeployments, setDcDeployments] = useState<DiscordDeployment[]>([]);

  // Web App state
  const [waName, setWaName] = useState("");
  const [waDesc, setWaDesc] = useState("");
  const [waTheme, setWaTheme] = useState("default");
  const [waFile, setWaFile] = useState(false);
  const [waVoice, setWaVoice] = useState(false);
  const [waDeployments, setWaDeployments] = useState<WebAppDeployment[]>([]);

  const [loading, setLoading] = useState(false);

  const refreshLists = async () => {
    try {
      const [tg, dc, wa] = await Promise.all([
        deployService.listTelegramDeployments(),
        deployService.listDiscordDeployments(),
        deployService.listWebAppDeployments(),
      ]);
      setTgDeployments(tg);
      setDcDeployments(dc);
      setWaDeployments(wa);
    } catch (e: any) {
      useDestructiveToast(e.message || "Failed to load deployments");
    }
  };

  useEffect(() => {
    refreshLists();
  }, []);

  const deployTelegram = async () => {
    if (!id || !tgToken || !tgName)
      return useDestructiveToast("Agent ID, token and name are required");
    try {
      setLoading(true);
      await deployService.deployTelegram({
        agent_id: parseInt(id),
        bot_token: tgToken,
        bot_name: tgName,
        webhook_url: tgWebhook || undefined,
        command_prefix: "/",
        mention_enabled: true,
        slash_commands_enabled: true,
        auto_response: true,
        group_chat_enabled: true,
        private_chat_enabled: true,
      });
      useNormalToast("Telegram bot deployed");
      setTgToken("");
      setTgName("");
      setTgWebhook("");
      refreshLists();
    } catch (e: any) {
      useDestructiveToast(e.message || "Failed to deploy Telegram bot");
    } finally {
      setLoading(false);
    }
  };

  const deployDiscord = async () => {
    if (!id || !dcToken || !dcName)
      return useDestructiveToast("Agent ID, token and name are required");
    try {
      setLoading(true);
      await deployService.deployDiscord({
        agent_id: parseInt(id),
        bot_token: dcToken,
        bot_name: dcName,
        guild_id: dcGuild || undefined,
        channel_id: dcChannel || undefined,
        command_prefix: "/",
        mention_enabled: true,
        slash_commands_enabled: true,
        auto_response: true,
      });
      useNormalToast("Discord bot deployed");
      setDcToken("");
      setDcName("");
      setDcGuild("");
      setDcChannel("");
      refreshLists();
    } catch (e: any) {
      useDestructiveToast(e.message || "Failed to deploy Discord bot");
    } finally {
      setLoading(false);
    }
  };

  const deployWebApp = async () => {
    if (!id || !waName)
      return useDestructiveToast("Agent ID and App name are required");
    try {
      setLoading(true);
      await deployService.deployWebApp({
        agent_id: parseInt(id),
        app_name: waName,
        app_description: waDesc || undefined,
        theme: waTheme,
        allow_file_upload: waFile,
        allow_voice: waVoice,
      });
      useNormalToast("Web app deployed");
      setWaName("");
      setWaDesc("");
      setWaTheme("default");
      setWaFile(false);
      setWaVoice(false);
      refreshLists();
    } catch (e: any) {
      useDestructiveToast(e.message || "Failed to deploy Web App");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Deploy Agent</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/agents/${id}`}>
              <Button variant="outline">Back to Agent</Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="telegram" className="space-y-6">
          <TabsList>
            <TabsTrigger value="telegram">Telegram</TabsTrigger>
            <TabsTrigger value="discord">Discord</TabsTrigger>
            <TabsTrigger value="webapp">Web App</TabsTrigger>
          </TabsList>

          <TabsContent value="telegram">
            <Card>
              <CardHeader>
                <CardTitle>Deploy to Telegram</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Bot Token</Label>
                    <Input
                      value={tgToken}
                      onChange={(e) => setTgToken(e.target.value)}
                      placeholder="123456:ABC-DEF..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bot Name</Label>
                    <Input
                      value={tgName}
                      onChange={(e) => setTgName(e.target.value)}
                      placeholder="My Agent Bot"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Webhook URL (optional)</Label>
                    <Input
                      value={tgWebhook}
                      onChange={(e) => setTgWebhook(e.target.value)}
                      placeholder="https://yourdomain.com/api/telegram/webhook/{deployment_id}"
                    />
                  </div>
                </div>
                <Button onClick={deployTelegram} disabled={loading}>
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Deploy Telegram Bot
                </Button>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">
                    Your Telegram Deployments
                  </h3>
                  <div className="space-y-3">
                    {tgDeployments.length === 0 && (
                      <div className="text-muted-foreground text-sm">
                        No deployments yet.
                      </div>
                    )}
                    {tgDeployments.map((d) => (
                      <div
                        key={d.deployment_id}
                        className="flex items-center justify-between border rounded p-3"
                      >
                        <div>
                          <div className="font-medium">
                            {d.bot_name} @{d.bot_username}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Status: {d.status}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={d.webhook_url || "#"}
                            target="_blank"
                            className="text-xs underline"
                          >
                            Webhook
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discord">
            <Card>
              <CardHeader>
                <CardTitle>Deploy to Discord</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Bot Token</Label>
                    <Input
                      value={dcToken}
                      onChange={(e) => setDcToken(e.target.value)}
                      placeholder="Bot token"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bot Name</Label>
                    <Input
                      value={dcName}
                      onChange={(e) => setDcName(e.target.value)}
                      placeholder="My Agent Bot"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Guild ID (optional)</Label>
                    <Input
                      value={dcGuild}
                      onChange={(e) => setDcGuild(e.target.value)}
                      placeholder="123456789"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Channel ID (optional)</Label>
                    <Input
                      value={dcChannel}
                      onChange={(e) => setDcChannel(e.target.value)}
                      placeholder="123456789"
                    />
                  </div>
                </div>
                <Button onClick={deployDiscord} disabled={loading}>
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Deploy Discord Bot
                </Button>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">
                    Your Discord Deployments
                  </h3>
                  <div className="space-y-3">
                    {dcDeployments.length === 0 && (
                      <div className="text-muted-foreground text-sm">
                        No deployments yet.
                      </div>
                    )}
                    {dcDeployments.map((d) => (
                      <div
                        key={d.deployment_id}
                        className="flex items-center justify-between border rounded p-3"
                      >
                        <div>
                          <div className="font-medium">{d.bot_name}</div>
                          <div className="text-xs text-muted-foreground">
                            Status: {d.status}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">
                            ID: {d.deployment_id}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webapp">
            <Card>
              <CardHeader>
                <CardTitle>Deploy as Web App</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>App Name</Label>
                    <Input
                      value={waName}
                      onChange={(e) => setWaName(e.target.value)}
                      placeholder="My Agent App"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>App Description (optional)</Label>
                    <Input
                      value={waDesc}
                      onChange={(e) => setWaDesc(e.target.value)}
                      placeholder="Describe your app"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <select
                      className="w-full h-9 rounded-md border bg-background/50 px-3"
                      value={waTheme}
                      onChange={(e) => setWaTheme(e.target.value)}
                    >
                      <option value="default">Default</option>
                      <option value="soft">Soft</option>
                      <option value="dark">Dark</option>
                      <option value="glass">Glass</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>File Upload</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={waFile}
                        onChange={(e) => setWaFile(e.target.checked)}
                      />
                      <span className="text-sm text-muted-foreground">
                        Allow users to upload files
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Voice Input</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={waVoice}
                        onChange={(e) => setWaVoice(e.target.checked)}
                      />
                      <span className="text-sm text-muted-foreground">
                        Enable voice-to-text
                      </span>
                    </div>
                  </div>
                </div>
                <Button onClick={deployWebApp} disabled={loading}>
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Deploy Web App
                </Button>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">
                    Your Web App Deployments
                  </h3>
                  <div className="space-y-3">
                    {waDeployments.length === 0 && (
                      <div className="text-muted-foreground text-sm">
                        No deployments yet.
                      </div>
                    )}
                    {waDeployments.map((d) => (
                      <div
                        key={d.deployment_id}
                        className="flex items-center justify-between border rounded p-3"
                      >
                        <div>
                          <div className="font-medium">{d.app_name}</div>
                          <div className="text-xs text-muted-foreground">
                            Status: {d.status} • Port: {d.port}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {d.url && (
                            <a
                              href={d.url}
                              target="_blank"
                              className="text-xs underline"
                            >
                              Open
                            </a>
                          )}
                          <Badge variant="secondary">
                            ID: {d.deployment_id}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentDeploy;

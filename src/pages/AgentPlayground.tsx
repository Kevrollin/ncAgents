import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, TerminalSquare, Trash2, Bot, User } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { agentService } from "@/services/agentService";
import { useNormalToast } from "@/hooks/use-normal-toast";
import { useDestructiveToast } from "@/hooks/use-destructive-toast";

interface CliMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const AgentPlayground = () => {
  const { id } = useParams();
  const [sessionId, setSessionId] = useState<string>("");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CliMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // initialize a session id
    setSessionId(crypto.randomUUID());
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSend = async () => {
    if (!input.trim() || !id) return;
    const message: CliMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };
    setHistory((h) => [...h, message]);
    setInput("");

    try {
      setLoading(true);
      const res = await agentService.chatWithAgent(parseInt(id), {
        message: message.content,
        session_id: sessionId,
        voice_enabled: false,
        fresh_conversation: false,
      });

      const reply: CliMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: res.response,
        timestamp: new Date().toISOString(),
      };
      setHistory((h) => [...h, reply]);
    } catch (err: any) {
      useDestructiveToast(err.message || "Failed to chat with agent");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => setHistory([]);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TerminalSquare className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Agent CLI Playground</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/agents/${id}`}>
              <Button variant="outline">Back to Agent</Button>
            </Link>
            <Button variant="outline" onClick={handleClear}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" /> Interactive Shell
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[60vh] overflow-y-auto rounded-md border p-4 bg-black text-green-200 font-mono text-sm">
              {history.length === 0 && (
                <div className="text-muted-foreground">
                  Type a message below to start chatting...
                </div>
              )}
              {history.map((m) => (
                <div key={m.id} className="mb-3">
                  <div className="flex items-center gap-2">
                    {m.role === "user" ? (
                      <User className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Bot className="w-4 h-4 text-emerald-400" />
                    )}
                    <span className="text-xs opacity-60">
                      {new Date(m.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <pre className="whitespace-pre-wrap mt-1">{m.content}</pre>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>

            <div className="mt-4 flex gap-2">
              <Input
                placeholder="> Type your command or message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={loading}
              />
              <Button onClick={handleSend} disabled={loading || !input.trim()}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentPlayground;

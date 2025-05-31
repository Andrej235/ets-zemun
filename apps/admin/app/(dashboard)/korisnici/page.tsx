"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { MoreHorizontal, Search, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import sendApiRequest from "@/api-dsl/send-api-request";
import { RoleBadge } from "@/components/role-badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUserStore } from "@/stores/user-store";

type UserType = Schema<"AdminUserResponseDto">;
type Role = "admin" | "mod" | "user";

export default function UsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const me = useUserStore((x) => x.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await sendApiRequest("/users/all", {
          method: "get",
          parameters: {
            limit: -1,
          },
        });
        setUsers(data.response!);
      } catch {
        toast.error("Neuspešno učitavanje korisnika");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  async function updateUserRole(id: string, role: Role) {
    const promise = sendApiRequest(`/users/{id}/set-as-${role}`, {
      method: "patch",
      parameters: {
        id,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Neuspešno ažuriranje uloge korisnika",
          );
      }),
      {
        loading: "Ažuriranje uloge korisnika...",
        success: "Uloga korisnika je uspešno ažurirana",
        error: (x) => (x as Error).message,
      },
    );

    return (await promise).isOk;
  }

  const handleUpdateRole = async (id: string, role: Role) => {
    const response = await updateUserRole(id, role);
    if (!response) return;

    setUsers(users.map((user) => (user.id === id ? { ...user, role } : user)));
  };

  const handleDeleteUser = async (id: string) => {
    const promise = sendApiRequest(`/users/{id}`, {
      method: "delete",
      parameters: {
        id,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ?? "Neuspešno brisanje korisnika",
          );
      }),
      {
        loading: "Brisanje korisnika...",
        success: "Korisnik je uspešno obrisan",
        error: (x) => (x as Error).message,
      },
    );

    const response = await promise;
    if (!response.isOk) throw new Error(response.error?.message);

    setUsers(users.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Korisnici</h1>
        <p className="text-muted-foreground">
          Upravljajte korisničkim nalozima i dozvolama
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pretraži korisnike..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      ) : filteredUsers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <User className="mb-4 h-10 w-10 text-muted-foreground" />
            <CardTitle className="mb-2">Nema pronađenih korisnika</CardTitle>
            <CardDescription>
              {searchTerm
                ? "Pokušajte sa drugim pojmom za pretragu"
                : "Nema registrovanih korisnika u sistemu"}
            </CardDescription>
          </CardContent>
        </Card>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card>
            <CardHeader>
              <CardTitle>Registrovani korisnici</CardTitle>
              <CardDescription>
                Upravljajte korisničkim nalozima i ulogama
              </CardDescription>
            </CardHeader>
            <CardContent className="mx-auto max-w-[90vw] lg:mx-0 lg:max-w-none">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Korisničko ime</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Uloga</TableHead>
                    <TableHead className="text-right">Akcije</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <RoleBadge role={user.role} />
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            {me?.username === user.name ? null : (
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            )}
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Akcije</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleUpdateRole(user.id, "user")}
                              disabled={user.role === "user"}
                            >
                              Postavi kao korisnika
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleUpdateRole(user.id, "mod")}
                              disabled={user.role === "moderator"}
                            >
                              Postavi kao moderatora
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleUpdateRole(user.id, "admin")}
                              disabled={user.role === "admin"}
                            >
                              Postavi kao administratora
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="gap-0 text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Obriši korisnika
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Da li ste sigurni da želite da obrišete ovog
                                    korisnika?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Ova akcija je nepovratna. Ovo će trajno
                                    obrisati korisnika i ukloniti njegove
                                    podatke iz sistema.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Otkaži</AlertDialogCancel>
                                  <AlertDialogAction
                                    className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
                                    onClick={() => handleDeleteUser(user.id)}
                                  >
                                    Obriši
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

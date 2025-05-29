import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import RecentLoginsDescription from "@/components/recent-logins-description";
import { RoleBadge } from "@/components/role-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistance } from "date-fns";
import {
  Award,
  BookOpen,
  FileText,
  Globe,
  LogIn,
  MessageSquare,
  Users,
} from "lucide-react";

export default async function Dashboard() {
  const {
    isOk: isOverviewOk,
    error: overviewError,
    response: overviewData,
  } = await sendApiRequestSSR("/admin/overview", {
    method: "get",
  });

  if (!isOverviewOk || !overviewData) {
    console.log(overviewError);
    return null;
  }

  function formatDate(date: string) {
    return formatDistance(new Date(date), new Date(), {
      addSuffix: true,
    });
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kontrolna tabla</h1>
        <p className="text-muted-foreground">
          Dobrodošli u administratorski panel škole.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="gap-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vesti</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewData.newsCount}</div>
            <p className="text-xs text-muted-foreground">
              {overviewData.unapprovedNewsCount} čeka odobrenje
            </p>
          </CardContent>
        </Card>

        <Card className="gap-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Jezici</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overviewData.languagesCount}
            </div>
            <p className="text-xs text-muted-foreground">
              {overviewData.languages.join(", ")}
            </p>
          </CardContent>
        </Card>

        <Card className="gap-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Predmeti</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overviewData.subjectsCount}
            </div>
          </CardContent>
        </Card>

        <Card className="gap-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profili</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overviewData.profilesCount}
            </div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>

        <Card className="gap-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Nastavnici</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {overviewData.teachersCount}
            </div>
            <p className="text-xs text-muted-foreground">U svim odeljenjima</p>
          </CardContent>
        </Card>

        <Card className="gap-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Nagrade</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewData.awardsCount}</div>
            <p className="text-xs text-muted-foreground">
              Osvojili naši učenici
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Skorašnje prijave</CardTitle>
            <CardDescription>
              <RecentLoginsDescription />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {overviewData.logins.toReversed().map((x) => (
                <div
                  className="flex items-center gap-4"
                  key={`login-${x.name}-${x.loginTime}`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted/50">
                    <LogIn className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-[1]">
                    <p className="font-medium">{x.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(x.loginTime)}
                    </p>
                  </div>
                  <RoleBadge role={x.role.toLowerCase()} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status sistema</CardTitle>
            <CardDescription>Trenutne performanse sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Baza podataka</p>
                  <p className="text-sm text-green-500">Radi</p>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-[85%] rounded-full bg-green-500"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Skladište</p>
                  <p className="text-sm text-amber-500">65% zauzeto</p>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-[65%] rounded-full bg-amber-500"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">API</p>
                  <p className="text-sm text-green-500">Radi</p>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-[95%] rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import Link from "next/link";
import { logout } from "@/app/admin/actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrap" style={{ paddingTop: "clamp(112px,15vh,168px)", paddingBottom: 80 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <Link href="/admin" className="tag">
          Painel MBX
        </Link>
        <form action={logout}>
          <button type="submit" className="chip">
            Sair
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}

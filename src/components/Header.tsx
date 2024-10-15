import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

import { Link } from "react-router-dom"

export function Header() {
    return (
        <header className="bg-slate-900 h-12 flex justify-center">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link to="/" className={navigationMenuTriggerStyle()}>
                            Bloquear Alunos  
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/removidos" className={navigationMenuTriggerStyle()}>
                            Ver bloqueados  
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link to="/totalbloqueados" className={navigationMenuTriggerStyle()}>
                            Total
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    )
}

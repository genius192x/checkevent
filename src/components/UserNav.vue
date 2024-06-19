<script setup  >
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="relative h-8 w-8 rounded-full">
            <Avatar class="h-8 w-8">
            <AvatarImage src="src/assets/avatars/04.png" alt="@shadcn" />
            <AvatarFallback>АЗ</AvatarFallback>
            </Avatar>
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56" align="end">
        <DropdownMenuLabel class="font-normal flex">
            <div class="flex flex-col space-y-1">
            <p class="text-sm font-medium leading-none">
                Антон Зимин
            </p>
            <p class="text-xs leading-none text-muted-foreground">
                zimin@gmail.com
            </p>
            </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            <DropdownMenuItem>
              <router-link to="/settings">Профиль
<!--                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>-->
              </router-link>
            </DropdownMenuItem>
            <DropdownMenuItem>
            Счета
<!--            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>-->
            </DropdownMenuItem>
            <DropdownMenuItem>
              <router-link to="/settings">
                Настройки
<!--                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>-->
              </router-link>
            </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
            Выйти
<!--            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>-->
        </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

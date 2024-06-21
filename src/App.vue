<script setup lang="ts">
import Search from '@/components/Search.vue'
import UserNav from '@/components/UserNav.vue'
import { useColorMode } from '@vueuse/core'
const mode = useColorMode()
import Toaster from '@/components/ui/toast/Toaster.vue'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()



</script>

<template>
    <TooltipProvider :delay-duration="0">
      <div class=" flex-col md:flex">
        <div class="border-b">
          <div class="sticky top-0 flex h-16 z-50 items-center gap-4 border-b bg-background px-4 md:px-6 ">
            <div class="ml-auto flex items-center space-x-4 relative z-20">
              <Search />
              <UserNav />
            </div>
          </div>
<!--          <Button-->
<!--              variant="outline" @click="() => {-->
<!--                toast({-->
<!--                  title: 'Scheduled: Catch up',-->
<!--                  description: 'Friday, February 10, 2023 at 5:57 PM',-->
<!--                });-->
<!--              }"-->
<!--                    >-->
<!--            Add to calendar-->
<!--          </Button>-->
          <router-view class="relative z-20"></router-view>
        </div>
      </div>
    </TooltipProvider>
  <Toaster />
</template>

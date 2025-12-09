<template>
  <header class="sticky top-0 z-50 transition-all duration-300" :class="{ 'shadow-lg': isScrolled }">
    <!-- Top Bar -->
    <div class="bg-gray-50 transition-all duration-300" :class="{ 'py-2': isScrolled }">
      <div class="max-w-7xl mx-auto px-4 relative">
        <div class="flex items-center justify-between transition-all duration-300" :class="isScrolled ? 'h-12' : 'h-20'">
          <!-- Left Side - Contact Info -->
          <div class="hidden lg:flex items-center space-x-6">
            <a 
              :href="`tel:${contactInfo?.phone || '+995322123456'}`" 
              class="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors text-sm"
            >
              <Phone class="w-4 h-4" />
              <span>{{ contactInfo?.phone || '+995 32 2 123 456' }}</span>
            </a>
            <a 
              :href="`mailto:${contactInfo?.email || 'info@creative-georgia.ge'}`" 
              class="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors text-sm"
            >
              <Mail class="w-4 h-4" />
              <span>{{ contactInfo?.email || 'info@creative-georgia.ge' }}</span>
            </a>
          </div>

          <!-- Center - Empty for clean layout -->
          <div class="flex-1"></div>

          <!-- Right Actions -->
          <div class="flex items-center space-x-4">
            <!-- Social Media Icons -->
            <div class="hidden lg:flex items-center space-x-2">
              <a
                v-for="link in socialLinks"
                :key="link.id"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors text-gray-600"
              >
                <component :is="getSocialIcon(link.platform)" v-if="getSocialIcon(link.platform)" class="w-4 h-4" />
              </a>
            </div>

            <!-- Language Switcher -->
            <div class="relative">
              <button
                @click="langMenuOpen = !langMenuOpen"
                class="flex items-center space-x-2 px-3 py-2 bg-gray-200 rounded-full hover:bg-primary-500 hover:text-white transition-all duration-200 text-gray-600 font-medium text-sm"
              >
                <div class="flex items-center space-x-1">
                  <!-- Georgian Flag -->
                  <div v-if="$i18n.locale === 'ka'" class="w-4 h-4 rounded-full overflow-hidden border border-gray-300">
                    <svg viewBox="0 0 24 24" class="w-full h-full">
                      <rect width="24" height="24" fill="#FFFFFF"/>
                      <!-- Main Cross -->
                      <rect width="24" height="4" y="10" fill="#FF0000"/>
                      <rect width="4" height="24" x="10" fill="#FF0000"/>
                      <!-- Corner Crosses -->
                      <rect width="6" height="1.5" x="3" y="5.25" fill="#FF0000"/>
                      <rect width="1.5" height="6" x="5.25" y="3" fill="#FF0000"/>
                      <rect width="6" height="1.5" x="15" y="5.25" fill="#FF0000"/>
                      <rect width="1.5" height="6" x="17.25" y="3" fill="#FF0000"/>
                      <rect width="6" height="1.5" x="3" y="17.25" fill="#FF0000"/>
                      <rect width="1.5" height="6" x="5.25" y="15" fill="#FF0000"/>
                      <rect width="6" height="1.5" x="15" y="17.25" fill="#FF0000"/>
                      <rect width="1.5" height="6" x="17.25" y="15" fill="#FF0000"/>
                    </svg>
                  </div>
                  <!-- UK Flag -->
                  <div v-else class="w-4 h-4 rounded-full overflow-hidden border border-gray-300">
                    <svg viewBox="0 0 24 24" class="w-full h-full">
                      <rect width="24" height="24" fill="#012169"/>
                      <path d="M0,0 L24,24 M24,0 L0,24" stroke="#FFFFFF" stroke-width="2.4"/>
                      <path d="M0,0 L24,24 M24,0 L0,24" stroke="#C8102E" stroke-width="1.2"/>
                      <rect width="24" height="4" y="10" fill="#FFFFFF"/>
                      <rect width="24" height="2" y="11" fill="#C8102E"/>
                      <rect width="4" height="24" x="10" fill="#FFFFFF"/>
                      <rect width="2" height="24" x="11" fill="#C8102E"/>
                    </svg>
                  </div>
                  <span class="text-xs font-medium">{{ $i18n.locale.toUpperCase() }}</span>
                </div>
                <ChevronDown class="w-3 h-3 transition-transform duration-200" :class="{ 'rotate-180': langMenuOpen }" />
              </button>

              <!-- Language Dropdown -->
              <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95 translate-y-1"
                enter-to-class="transform opacity-100 scale-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="transform opacity-100 scale-100 translate-y-0"
                leave-to-class="transform opacity-0 scale-95 translate-y-1"
              >
                <div
                  v-if="langMenuOpen"
                  @click="langMenuOpen = false"
                  class="absolute right-0 mt-3 w-40 rounded-2xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
                >
                  <div class="py-2">
                    <button
                      @click="changeLanguage('ka')"
                      class="group flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:text-primary-700 transition-all duration-200 font-headline"
                      :class="{ 'bg-primary-50 text-primary-700': $i18n.locale === 'ka' }"
                    >
                      <div class="w-8 h-8 bg-primary-100 group-hover:bg-primary-200 rounded-full flex items-center justify-center mr-3 transition-colors duration-200">
                        <div class="w-5 h-5 rounded-full overflow-hidden border border-gray-300">
                          <svg viewBox="0 0 24 24" class="w-full h-full">
                            <rect width="24" height="24" fill="#FFFFFF"/>
                            <!-- Main Cross -->
                            <rect width="24" height="4" y="10" fill="#FF0000"/>
                            <rect width="4" height="24" x="10" fill="#FF0000"/>
                            <!-- Corner Crosses -->
                            <rect width="6" height="1.5" x="3" y="5.25" fill="#FF0000"/>
                            <rect width="1.5" height="6" x="5.25" y="3" fill="#FF0000"/>
                            <rect width="6" height="1.5" x="15" y="5.25" fill="#FF0000"/>
                            <rect width="1.5" height="6" x="17.25" y="3" fill="#FF0000"/>
                            <rect width="6" height="1.5" x="3" y="17.25" fill="#FF0000"/>
                            <rect width="1.5" height="6" x="5.25" y="15" fill="#FF0000"/>
                            <rect width="6" height="1.5" x="15" y="17.25" fill="#FF0000"/>
                            <rect width="1.5" height="6" x="17.25" y="15" fill="#FF0000"/>
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div class="font-medium">ქართული</div>
                        <div class="text-xs text-gray-500">Georgian</div>
                      </div>
                    </button>
                    
                    <button
                      @click="changeLanguage('en')"
                      class="group flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-secondary-50 hover:to-secondary-100 hover:text-secondary-700 transition-all duration-200 font-headline"
                      :class="{ 'bg-secondary-50 text-secondary-700': $i18n.locale === 'en' }"
                    >
                      <div class="w-8 h-8 bg-secondary-100 group-hover:bg-secondary-200 rounded-full flex items-center justify-center mr-3 transition-colors duration-200">
                        <div class="w-5 h-5 rounded-full overflow-hidden border border-gray-300">
                          <svg viewBox="0 0 24 24" class="w-full h-full">
                            <rect width="24" height="24" fill="#012169"/>
                            <path d="M0,0 L24,24 M24,0 L0,24" stroke="#FFFFFF" stroke-width="2.4"/>
                            <path d="M0,0 L24,24 M24,0 L0,24" stroke="#C8102E" stroke-width="1.2"/>
                            <rect width="24" height="4" y="10" fill="#FFFFFF"/>
                            <rect width="24" height="2" y="11" fill="#C8102E"/>
                            <rect width="4" height="24" x="10" fill="#FFFFFF"/>
                            <rect width="2" height="24" x="11" fill="#C8102E"/>
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div class="font-medium">English</div>
                        <div class="text-xs text-gray-500">ინგლისური</div>
                      </div>
                    </button>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Search -->
            <div class="relative">
              <button
                @click="searchOpen = !searchOpen"
                class="p-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Search class="w-5 h-5" />
              </button>

              <!-- Search Dropdown -->
              <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="searchOpen"
                  class="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                >
                  <div class="p-4">
                    <div class="relative">
                      <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search competitions, news, events..."
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        @keyup.enter="performSearch"
                      />
                      <Search class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                    <div class="mt-3 flex justify-end">
                      <button
                        @click="performSearch"
                        class="px-4 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors text-sm"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>


          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <div class="bg-primary-500 transition-all duration-300">
      <div class="max-w-7xl mx-auto transition-all duration-300 px-4">
        <div class="flex items-center justify-between transition-all duration-300" :class="isScrolled ? 'h-24' : 'h-32'">
          <!-- Logo - Left -->
          <div class="flex-shrink-0">
            <RouterLink 
              :to="{ name: 'home' }" 
              class="flex items-center justify-center transition-all duration-300"
            >
              <img
                :src="whiteLogo"
                :alt="siteConfig?.name?.ka || $t('app.name')"
                class="transition-all duration-300 group-hover:opacity-90"
                :class="isScrolled ? 'h-20' : 'h-28'"
              />
            </RouterLink>
          </div>

          <!-- Dynamic Navigation Links - Center -->
          <nav 
            class="hidden lg:flex items-center justify-center space-x-3 transition-all duration-300 flex-1"
          >
            <!-- Dynamic Menu Items -->
            <template v-if="useDynamicMenu">
              <template v-for="item in headerMenu.items" :key="item.id">
                <!-- Menu Item with Children (Mega Menu) -->
                <div v-if="item.children && item.children.length > 0" class="relative group">
                  <button class="flex items-center text-white text-sm hover:text-secondary-200 transition-colors font-headline whitespace-nowrap">
                    {{ $i18n.locale === 'ka' ? item.title.ka : item.title.en }}
                    <ChevronDown class="w-3 h-3 ml-1" />
                  </button>
                  <div class="absolute top-full left-0 mt-0 w-96 bg-white rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div class="p-6">
                      <h3 class="font-semibold text-primary-600 mb-6 text-lg font-headline">
                        {{ $i18n.locale === 'ka' ? item.title.ka : item.title.en }}
                      </h3>
                      <ul class="space-y-3">
                        <li v-for="(child, index) in item.children" :key="child.id">
                          <RouterLink 
                            :to="child.url" 
                            :class="[
                              'group flex items-center px-4 py-3 text-sm text-gray-700 transition-all duration-200 font-headline rounded-full',
                              index % 2 === 0 
                                ? 'hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:text-primary-700' 
                                : 'hover:bg-gradient-to-r hover:from-secondary-50 hover:to-secondary-100 hover:text-secondary-700'
                            ]"
                          >
                            <div 
                              :class="[
                                'w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-colors duration-200',
                                index % 2 === 0 
                                  ? 'bg-primary-100 group-hover:bg-primary-200' 
                                  : 'bg-secondary-100 group-hover:bg-secondary-200'
                              ]"
                            >
                              <div 
                                :class="[
                                  'w-3 h-3 rounded-full',
                                  index % 2 === 0 
                                    ? 'border-2 border-primary-500' 
                                    : 'bg-secondary-500'
                                ]"
                              ></div>
                            </div>
                            <div>
                              <div class="font-medium">{{ $i18n.locale === 'ka' ? child.title.ka : child.title.en }}</div>
                              <div v-if="child.subtitle" class="text-xs text-gray-500">
                                {{ $i18n.locale === 'ka' ? child.subtitle.ka : child.subtitle.en }}
                              </div>
                            </div>
                          </RouterLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Single Menu Item (No Children) -->
                <RouterLink
                  v-else
                  :to="item.url"
                  class="text-white text-sm hover:text-secondary-200 transition-colors font-headline whitespace-nowrap"
                >
                  {{ $i18n.locale === 'ka' ? item.title.ka : item.title.en }}
                </RouterLink>
              </template>
            </template>

            <!-- Fallback Navigation (if menu not loaded) -->
            <template v-else>
              <!-- About Mega Menu -->
              <div class="relative group">
                <button class="flex items-center text-white text-sm hover:text-secondary-200 transition-colors font-headline whitespace-nowrap">
                  {{ $t('nav.about') }}
                  <ChevronDown class="w-3 h-3 ml-1" />
                </button>
                <div class="absolute top-full left-0 mt-0 w-96 bg-white rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div class="p-6">
                    <h3 class="font-semibold text-primary-600 mb-6 text-lg font-headline">{{ $t('nav.about') }}</h3>
                    <ul class="space-y-3">
                      <li>
                        <RouterLink :to="{ name: 'about-mission' }" class="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:text-primary-700 transition-all duration-200 font-headline rounded-full">
                          <div class="w-8 h-8 bg-primary-100 group-hover:bg-primary-200 rounded-full flex items-center justify-center mr-3 transition-colors duration-200">
                            <div class="w-3 h-3 border-2 border-primary-500 rounded-full"></div>
                          </div>
                          <div>
                            <div class="font-medium">მისია და მიზნები</div>
                            <div class="text-xs text-gray-500">ჩვენი ხედვა და მისია</div>
                          </div>
                        </RouterLink>
                      </li>
                      <li>
                        <RouterLink :to="{ name: 'about-reports' }" class="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-secondary-50 hover:to-secondary-100 hover:text-secondary-700 transition-all duration-200 font-headline rounded-full">
                          <div class="w-8 h-8 bg-secondary-100 group-hover:bg-secondary-200 rounded-full flex items-center justify-center mr-3 transition-colors duration-200">
                            <div class="w-3 h-3 border-2 border-secondary-500 rounded-full"></div>
                          </div>
                          <div>
                            <div class="font-medium">ანგარიშგებები და სტრატეგია</div>
                            <div class="text-xs text-gray-500">ანგარიშები და სტრატეგია</div>
                          </div>
                        </RouterLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Competitions Mega Menu -->
              <div class="relative group">
                <button class="flex items-center text-white text-sm hover:text-secondary-200 transition-colors font-headline whitespace-nowrap">
                  {{ $t('nav.competitions') }}
                  <ChevronDown class="w-3 h-3 ml-1" />
                </button>
                <div class="absolute top-full left-0 mt-0 w-96 bg-white rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div class="p-6">
                    <h3 class="font-semibold text-primary-600 mb-6 text-lg font-headline">{{ $t('nav.competitions') }}</h3>
                    <ul class="space-y-3">
                      <li>
                        <RouterLink :to="{ name: 'competitions-current' }" class="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-secondary-50 hover:to-secondary-100 hover:text-secondary-700 transition-all duration-200 font-headline rounded-full">
                          <div class="w-8 h-8 bg-secondary-100 group-hover:bg-secondary-200 rounded-full flex items-center justify-center mr-3 transition-colors duration-200">
                            <div class="w-3 h-3 bg-secondary-500 rounded-full"></div>
                          </div>
                          <div>
                            <div class="font-medium">მიმდინარე კონკურსები</div>
                            <div class="text-xs text-gray-500">აქტიური კონკურსები</div>
                          </div>
                        </RouterLink>
                      </li>
                      <li>
                        <RouterLink :to="{ name: 'competitions-archive' }" class="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:text-primary-700 transition-all duration-200 font-headline rounded-full">
                          <div class="w-8 h-8 bg-primary-100 group-hover:bg-primary-200 rounded-full flex items-center justify-center mr-3 transition-colors duration-200">
                            <div class="w-3 h-3 border-2 border-primary-500 rounded-full"></div>
                          </div>
                          <div>
                            <div class="font-medium">დასრულებული კონკურსები (არქივი)</div>
                            <div class="text-xs text-gray-500">წარსული კონკურსები</div>
                          </div>
                        </RouterLink>
                      </li>
                      <li>
                        <RouterLink :to="{ name: 'competitions-success-stories' }" class="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-secondary-50 hover:to-secondary-100 hover:text-secondary-700 transition-all duration-200 font-headline rounded-full">
                          <div class="w-8 h-8 bg-secondary-100 group-hover:bg-secondary-200 rounded-full flex items-center justify-center mr-3 transition-colors duration-200">
                            <div class="w-2 h-2 bg-secondary-500 rounded-full"></div>
                            <div class="w-2 h-2 bg-secondary-500 rounded-full ml-1"></div>
                          </div>
                          <div>
                            <div class="font-medium">წარმატებული ისტორიები</div>
                            <div class="text-xs text-gray-500">წარმატების მაგალითები</div>
                          </div>
                        </RouterLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- News & Events Mega Menu -->
              <div class="relative group">
                <button class="flex items-center text-white text-sm hover:text-secondary-200 transition-colors font-headline whitespace-nowrap">
                  {{ $t('nav.news') }} და {{ $t('nav.events') }}
                  <ChevronDown class="w-3 h-3 ml-1" />
                </button>
                <div class="absolute top-full left-0 mt-0 w-96 bg-white rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div class="p-6">
                    <h3 class="font-semibold text-primary-600 mb-6 text-lg font-headline">{{ $t('nav.news') }} და {{ $t('nav.events') }}</h3>
                    <ul class="space-y-3">
                      <li>
                        <RouterLink :to="{ name: 'news' }" class="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:text-primary-700 transition-all duration-200 font-headline rounded-full">
                          <div class="w-8 h-8 bg-primary-100 group-hover:bg-primary-200 rounded-full flex items-center justify-center mr-3 transition-colors duration-200">
                            <div class="w-3 h-3 bg-primary-500 rounded-full"></div>
                          </div>
                          <div>
                            <div class="font-medium">ახალი ამბები</div>
                            <div class="text-xs text-gray-500">უახლესი სიახლეები</div>
                          </div>
                        </RouterLink>
                      </li>
                      <li>
                        <RouterLink :to="{ name: 'events' }" class="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-secondary-50 hover:to-secondary-100 hover:text-secondary-700 transition-all duration-200 font-headline rounded-full">
                          <div class="w-8 h-8 bg-secondary-100 group-hover:bg-secondary-200 rounded-full flex items-center justify-center mr-3 transition-colors duration-200">
                            <div class="w-3 h-3 border-2 border-secondary-500 rounded-full"></div>
                          </div>
                          <div>
                            <div class="font-medium">ღონისძიებების კალენდარი</div>
                            <div class="text-xs text-gray-500">მომავალი ღონისძიებები</div>
                          </div>
                        </RouterLink>
                      </li>
                      <li>
                        <RouterLink :to="{ name: 'press' }" class="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:text-primary-700 transition-all duration-200 font-headline rounded-full">
                          <div class="w-8 h-8 bg-primary-100 group-hover:bg-primary-200 rounded-full flex items-center justify-center mr-3 transition-colors duration-200">
                            <div class="w-2 h-2 bg-primary-500 rounded-full"></div>
                            <div class="w-2 h-2 bg-primary-500 rounded-full ml-1"></div>
                          </div>
                          <div>
                            <div class="font-medium">პრესა / მედია ჩვენს შესახებ</div>
                            <div class="text-xs text-gray-500">მედია გაშუქება</div>
                          </div>
                        </RouterLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Resources Mega Menu -->
              <div class="relative group">
                <button class="flex items-center text-white text-sm hover:text-secondary-200 transition-colors font-headline whitespace-nowrap">
                  {{ $t('nav.resources') }}
                  <ChevronDown class="w-3 h-3 ml-1" />
                </button>
                <div class="absolute top-full left-0 mt-0 w-96 bg-white rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div class="p-6">
                    <h3 class="font-semibold text-primary-600 mb-6 text-lg font-headline">{{ $t('nav.resources') }}</h3>
                    <ul class="space-y-3">
                      <li>
                        <RouterLink :to="{ name: 'faqs' }" class="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-secondary-50 hover:to-secondary-100 hover:text-secondary-700 transition-all duration-200 font-headline rounded-full">
                          <div class="w-8 h-8 bg-secondary-100 group-hover:bg-secondary-200 rounded-full flex items-center justify-center mr-3 transition-colors duration-200">
                            <div class="w-3 h-3 border-2 border-secondary-500 rounded-full"></div>
                          </div>
                          <div>
                            <div class="font-medium">ხშირად დასმული კითხვები (FAQ)</div>
                            <div class="text-xs text-gray-500">პასუხები კითხვებზე</div>
                          </div>
                        </RouterLink>
                      </li>
                      <li>
                        <RouterLink :to="{ name: 'resources-acts' }" class="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-secondary-50 hover:to-secondary-100 hover:text-secondary-700 transition-all duration-200 font-headline rounded-full">
                          <div class="w-8 h-8 bg-secondary-100 group-hover:bg-secondary-200 rounded-full flex items-center justify-center mr-3 transition-colors duration-200">
                            <div class="w-2 h-2 bg-secondary-500 rounded-full"></div>
                            <div class="w-2 h-2 bg-secondary-500 rounded-full ml-1"></div>
                          </div>
                          <div>
                            <div class="font-medium">აქტები და დებულებები</div>
                            <div class="text-xs text-gray-500">სამართლებრივი დოკუმენტები</div>
                          </div>
                        </RouterLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Contact -->
              <RouterLink
                :to="{ name: 'contact' }"
                class="text-white text-sm hover:text-secondary-200 transition-colors font-headline whitespace-nowrap"
              >
                {{ $t('nav.contact') }}
              </RouterLink>
            </template>
          </nav>

          <!-- Right Side - Auth Button / Mobile Menu -->
          <div class="flex items-center justify-end flex-shrink-0 lg:ml-0">
            <!-- Desktop Auth Button -->
            <div class="hidden lg:flex items-center">
              <div v-if="!authStore.isAuthenticated" class="relative">
                <!-- Application Form Button -->
                <RouterLink
                  :to="{ name: 'application-step-1' }"
                  class="flex items-center space-x-2 px-4 py-2 bg-secondary-500 hover:bg-secondary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-headline"
                >
                  <!-- Creative User Icon -->
                  <div class="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <div class="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span class="text-sm font-medium">{{ $t('header.fillApplicationForm') }}</span>
                </RouterLink>
              </div>

              <div v-else class="relative">
                <button
                  @click="userMenuOpen = !userMenuOpen"
                  class="flex items-center space-x-2 px-3 py-2 bg-secondary-500 rounded-full text-white hover:bg-secondary-600 transition-colors"
                >
                  <User class="w-4 h-4" />
                  <span class="text-sm font-medium">{{ authStore.user?.firstName }}</span>
                  <ChevronDown class="w-3 h-3" />
                </button>

                <!-- Dropdown Menu -->
                <Transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <div
                    v-if="userMenuOpen"
                    @click="userMenuOpen = false"
                    class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                  >
                    <div class="py-1">
                      <RouterLink
                        :to="{ name: 'dashboard' }"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {{ $t('nav.dashboard') }}
                      </RouterLink>
                      <RouterLink
                        :to="{ name: 'dashboard-profile' }"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {{ $t('nav.profile') }}
                      </RouterLink>
                      <hr class="my-1" />
                      <button
                        @click="handleLogout"
                        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {{ $t('nav.logout') }}
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- Mobile Menu Button -->
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="lg:hidden p-2 text-white ml-auto"
            >
              <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
              <X v-else class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div v-if="mobileMenuOpen" class="lg:hidden bg-white border-t border-gray-200">
        <nav class="max-w-7xl mx-auto px-4 py-4 space-y-1">
          <!-- Dynamic Mobile Menu Items -->
          <template v-if="useDynamicMenu">
            <template v-for="item in headerMenu.items" :key="item.id">
              <!-- Menu Item with Children -->
              <div v-if="item.children && item.children.length > 0">
                <button
                  @click="toggleMobileSubmenu(`item-${item.id}`)"
                  class="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-full transition-all duration-200 font-headline"
                >
                  <span>{{ $i18n.locale === 'ka' ? item.title.ka : item.title.en }}</span>
                  <ChevronDown 
                    class="w-4 h-4 transition-transform duration-200" 
                    :class="{ 'rotate-180': mobileSubmenuOpen[`item-${item.id}`] }"
                  />
                </button>
                <Transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 max-h-0"
                  enter-to-class="opacity-100 max-h-96"
                  leave-active-class="transition ease-in duration-150"
                  leave-from-class="opacity-100 max-h-96"
                  leave-to-class="opacity-0 max-h-0"
                >
                  <div v-if="mobileSubmenuOpen[`item-${item.id}`]" class="overflow-hidden pl-4 space-y-1">
                    <RouterLink
                      v-for="child in item.children"
                      :key="child.id"
                      :to="child.url"
                      @click="mobileMenuOpen = false"
                      class="block px-4 py-2 text-sm text-gray-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:text-primary-700 rounded-full transition-all duration-200 font-headline"
                    >
                      {{ $i18n.locale === 'ka' ? child.title.ka : child.title.en }}
                    </RouterLink>
                  </div>
                </Transition>
              </div>

              <!-- Single Menu Item (No Children) -->
              <RouterLink
                v-else
                :to="item.url"
                @click="mobileMenuOpen = false"
                class="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-full transition-all duration-200 font-headline"
              >
                {{ $i18n.locale === 'ka' ? item.title.ka : item.title.en }}
              </RouterLink>
            </template>
          </template>

          <!-- Fallback Mobile Navigation (if menu not loaded) -->
          <template v-else>
            <RouterLink
              :to="{ name: 'competitions' }"
              @click="mobileMenuOpen = false"
              class="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-full transition-all duration-200 font-headline"
            >
              {{ $t('nav.competitions') }}
            </RouterLink>
            <RouterLink
              :to="{ name: 'news' }"
              @click="mobileMenuOpen = false"
              class="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-full transition-all duration-200 font-headline"
            >
              {{ $t('nav.news') }}
            </RouterLink>
            <RouterLink
              :to="{ name: 'events' }"
              @click="mobileMenuOpen = false"
              class="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-full transition-all duration-200 font-headline"
            >
              {{ $t('nav.events') }}
            </RouterLink>
            <RouterLink
              :to="{ name: 'contact' }"
              @click="mobileMenuOpen = false"
              class="block px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-full transition-all duration-200 font-headline"
            >
              {{ $t('nav.contact') }}
            </RouterLink>
          </template>
          
          <!-- Mobile CTA Button -->
          <div class="pt-4 border-t border-gray-200 mt-4">
            <RouterLink
              :to="{ name: 'application-step-1' }"
              @click="mobileMenuOpen = false"
              class="block px-4 py-3 bg-secondary-500 hover:bg-secondary-600 text-white text-center rounded-full shadow-lg transition-all duration-300 font-headline font-medium"
            >
              {{ $t('header.fillApplicationForm') }}
            </RouterLink>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../stores/auth'
import { useMenusStore } from '../../stores/menus'
import { useSettingsStore } from '../../stores/settings'
import { useSocialLinksStore } from '../../stores/socialLinks'
import { 
  ChevronDown, 
  Menu, 
  X,
  Search,
  Facebook,
  Youtube,
  Linkedin,
  Instagram,
  Twitter,
  User,
  Phone,
  Mail
} from 'lucide-vue-next'
import whiteLogo from '../../assets/images/white-geo-logo.png'
// LanguageSwitcher is now integrated directly in this component

const router = useRouter()
const authStore = useAuthStore()
const menusStore = useMenusStore()
const settingsStore = useSettingsStore()
const socialLinksStore = useSocialLinksStore()

const userMenuOpen = ref(false)
const mobileMenuOpen = ref(false)
const langMenuOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const isScrolled = ref(false)

// Dynamic menu data
const headerMenu = computed(() => menusStore.headerMenu)
const contactInfo = computed(() => settingsStore.getContactInfo())
const socialLinks = computed(() => socialLinksStore.links)
const siteConfig = computed(() => settingsStore.getSiteConfig())

// Map platform names to icons
const getSocialIcon = (platform: string) => {
  const platformLower = platform.toLowerCase()
  if (platformLower.includes('facebook')) return Facebook
  if (platformLower.includes('youtube')) return Youtube
  if (platformLower.includes('linkedin')) return Linkedin
  if (platformLower.includes('instagram')) return Instagram
  if (platformLower.includes('twitter') || platformLower.includes('x')) return Twitter
  return null
}

// Check if we should use dynamic menu or fallback
const useDynamicMenu = computed(() => {
  return headerMenu.value && 
         headerMenu.value.items && 
         Array.isArray(headerMenu.value.items) && 
         headerMenu.value.items.length > 0
})

// Dynamic mobile submenu states
const mobileSubmenuOpen = ref<Record<string, boolean>>({})

const toggleMobileSubmenu = (menu: string) => {
  mobileSubmenuOpen.value[menu] = !mobileSubmenuOpen.value[menu]
}

const handleLogout = async () => {
  await authStore.logout()
  router.push({ name: 'home' })
}

const { locale } = useI18n()

const changeLanguage = (code: string) => {
  locale.value = code
  localStorage.setItem('locale', code)
  langMenuOpen.value = false
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'search',
      query: { q: searchQuery.value.trim() }
    })
    searchOpen.value = false
    searchQuery.value = ''
  }
}

// Function available but not currently used - could be used for click outside behavior
// const closeDropdowns = () => {
//   userMenuOpen.value = false
//   langMenuOpen.value = false
//   searchOpen.value = false
// }

// Scroll detection for header animation
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  // Load menu, settings, and social links data
  await Promise.all([
    menusStore.fetchHeaderMenu(),
    settingsStore.fetchSettings(),
    socialLinksStore.fetchSocialLinks()
  ])
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

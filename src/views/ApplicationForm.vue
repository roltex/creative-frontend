<template>
  <div class="container-fluid py-8 lg:py-8">
    <!-- Back Button -->
    <div v-if="currentStep > 1" class="max-w-4xl mx-auto mb-6">
      <button
        @click="prevStep"
        class="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors font-medium"
      >
        <ArrowLeft :size="20" />
        <span>{{ $t('application.previous') }}</span>
      </button>
    </div>

    <!-- Progress Indicator -->
    <div class="sticky top-40 z-40 bg-white py-4 mb-10 shadow-sm border-b border-gray-100">
      <div class="max-w-5xl mx-auto">
        <div class="relative">
        <!-- Progress Bar Background -->
        <div class="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
        
        <!-- Progress Bar Fill -->
        <div 
          class="absolute top-6 left-0 h-1 bg-primary-500 rounded-full transition-all duration-500 ease-out"
          :style="{ width: `${((currentStep - 1) / 2) * 100}%` }"
        ></div>
        
        <!-- Steps -->
        <div class="relative flex items-start justify-between">
          <!-- Step 1 -->
          <div class="flex flex-col items-center flex-1 relative z-10">
            <div 
              class="w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-300 shadow-lg"
              :class="currentStep === 1 
                ? 'bg-primary-500 text-white scale-110 shadow-primary-500/50' 
                : currentStep > 1 
                  ? 'bg-primary-100 text-primary-600 border-2 border-primary-300' 
                  : 'bg-white text-gray-400 border-2 border-gray-300'">
              <span v-if="currentStep < 1" class="font-bold text-xl">1</span>
              <span v-else-if="currentStep === 1" class="font-bold text-xl">1</span>
              <Check v-else class="w-7 h-7" :stroke-width="3" />
            </div>
            <div class="text-center px-2">
              <span 
                class="text-sm font-semibold block transition-colors duration-300"
                :class="currentStep === 1 
                  ? 'text-primary-600' 
                  : currentStep > 1 
                    ? 'text-primary-600' 
                    : 'text-gray-500'">
                {{ $t('application.step1Title') }}
              </span>
            </div>
          </div>
          
          <!-- Step 2 -->
          <div class="flex flex-col items-center flex-1 relative z-10">
            <div 
              class="w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-300 shadow-lg"
              :class="currentStep === 2 
                ? 'bg-primary-500 text-white scale-110 shadow-primary-500/50' 
                : currentStep > 2 
                  ? 'bg-primary-100 text-primary-600 border-2 border-primary-300' 
                  : 'bg-white text-gray-400 border-2 border-gray-300'">
              <span v-if="currentStep < 2" class="font-bold text-xl">2</span>
              <span v-else-if="currentStep === 2" class="font-bold text-xl">2</span>
              <Check v-else class="w-7 h-7" :stroke-width="3" />
            </div>
            <div class="text-center px-2">
              <span 
                class="text-sm font-semibold block transition-colors duration-300"
                :class="currentStep === 2 
                  ? 'text-primary-600' 
                  : currentStep > 2 
                    ? 'text-primary-600' 
                    : 'text-gray-500'">
                {{ $t('application.step2Title') }}
              </span>
            </div>
          </div>
          
          <!-- Step 3 -->
          <div class="flex flex-col items-center flex-1 relative z-10">
            <div 
              class="w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-300 shadow-lg"
              :class="currentStep === 3 
                ? 'bg-primary-500 text-white scale-110 shadow-primary-500/50' 
                : currentStep > 3 
                  ? 'bg-green-500 text-white border-2 border-green-300' 
                  : 'bg-white text-gray-400 border-2 border-gray-300'">
              <span v-if="currentStep < 3" class="font-bold text-xl">3</span>
              <span v-else-if="currentStep === 3" class="font-bold text-xl">3</span>
              <Check v-else class="w-7 h-7 text-white" :stroke-width="3" />
            </div>
            <div class="text-center px-2">
              <span 
                class="text-sm font-semibold block transition-colors duration-300"
                :class="currentStep === 3 
                  ? 'text-primary-600' 
                  : currentStep > 3 
                    ? 'text-green-600' 
                    : 'text-gray-500'">
                {{ $t('application.step3Title') }}
              </span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>

    <!-- Form -->
    <div class="max-w-5xl mx-auto">
      <div class="bg-white rounded-3xl shadow-lg p-8 lg:p-12">
        <!-- Step 1: Personal Information -->
        <div v-if="currentStep === 1">
          <h2 class="text-3xl font-bold text-gray-900 mb-6 font-headline">{{ $t('application.step1Title') }}</h2>
          
          <form @submit.prevent="nextStep" class="space-y-6">
            <!-- Applicant Information -->
            <div class="bg-gray-50 rounded-2xl p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4 font-headline">{{ $t('application.applicantInfo') }}</h3>
              
              <!-- Applicant Type -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t('application.applicantType') }} <span class="text-red-500">*</span>
                </label>
                <select v-model="form.applicantType" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
                  <option value="">{{ $t('application.selectType') }}</option>
                  <option value="legal_entity">{{ $t('application.applicantTypeLegal') }}</option>
                  <option value="individual">{{ $t('application.applicantTypePhysical') }}</option>
                </select>
              </div>

              <!-- Legal Entity Fields -->
              <div v-if="form.applicantType === 'legal_entity'" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ $t('application.orgName') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.orgName"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ $t('application.orgIdentificationCode') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.orgIdCode"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ $t('application.orgHead') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.orgHead"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ $t('application.address') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.orgAddress"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ $t('application.phone') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.orgPhone"
                      type="tel"
                      required
                      placeholder="+995XXXXXXXXX"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ $t('application.email') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.orgEmail"
                      type="email"
                      required
                      @input="restrictToEmailChars('orgEmail', $event)"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              <!-- Individual Fields -->
              <div v-if="form.applicantType === 'individual'" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ $t('application.firstName') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.personFullName"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ $t('application.personalNumber') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.personIdNumber"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ $t('application.phone') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.personPhone"
                      type="tel"
                      required
                      placeholder="+995XXXXXXXXX"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ $t('application.email') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.personEmail"
                      type="email"
                      required
                      @input="restrictToEmailChars('personEmail', $event)"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              <!-- Contact Person (always shown) -->
              <div class="border-t pt-6 mt-6">
                <h4 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('application.contactPerson') }}</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ $t('application.firstName') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.contactFullName"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ $t('application.personalNumber') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.contactPersonalId"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ $t('application.phone') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.contactPhone"
                      type="tel"
                      required
                      placeholder="+995XXXXXXXXX"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ $t('application.email') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.contactEmail"
                      type="email"
                      required
                      @input="restrictToEmailChars('contactEmail', $event)"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end pt-6">
              <button
                type="submit"
                class="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-headline"
              >
                {{ $t('application.next') }}
              </button>
            </div>
          </form>
        </div>

        <!-- Step 2: Complete Application Form -->
        <div v-if="currentStep === 2">
          <h2 class="text-3xl font-bold text-gray-900 mb-6 font-headline">{{ $t('application.step2Title') }}</h2>
          
          <form @submit.prevent="nextStep" class="space-y-8">
            <!-- Application Type -->
            <div class="bg-gray-50 rounded-2xl p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4 font-headline">1. {{ $t('application.applicationType') }}</h3>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t('application.applicationType') }} <span class="text-red-500">*</span>
                </label>
                <select v-model="form.applicationType" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
                  <option value="">{{ $t('application.selectType') }}</option>
                  <option value="non_competitive">{{ $t('application.applicationTypeNonCompetitive') }}</option>
                  <option value="competitive">{{ $t('application.applicationTypeCompetitive') }}</option>
                </select>
              </div>
              
              <!-- Competition Title (only if competitive) -->
              <div v-if="form.applicationType === 'competitive'" class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t('application.competitionTitle') }} <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.competitionTitle"
                  type="text"
                  required
                  maxlength="200"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <!-- Project Information -->
            <div class="bg-gray-50 rounded-2xl p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4 font-headline">2. {{ $t('application.projectInfo') }}</h3>
              
              <div class="space-y-6">
                <!-- Project Title -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ $t('application.projectName') }} <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.title"
                    type="text"
                    required
                    maxlength="200"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                <!-- Requested Amount -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ $t('application.requiredAmount') }} (₾) <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <input
                      v-model.number="form.requestedAmountGel"
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                  </div>
                </div>

                <!-- Start and End Dates -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ $t('application.projectStartDate') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.startDate"
                      type="date"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ $t('application.projectEndDate') }} <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="form.endDate"
                      type="date"
                      required
                      :min="form.startDate"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Applicant Information -->
            <div class="bg-gray-50 rounded-2xl p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4 font-headline">3. {{ $t('application.coFinancing') }}</h3>
              
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ $t('application.hasCofunding') }} <span class="text-red-500">*</span>
                  </label>
                  <div class="flex gap-4">
                    <label class="flex items-center cursor-pointer">
                      <input type="radio" v-model="form.hasCofunding" value="no" required class="mr-2" />
                      <span>{{ $t('application.no') }}</span>
                    </label>
                    <label class="flex items-center cursor-pointer">
                      <input type="radio" v-model="form.hasCofunding" value="yes" required class="mr-2" />
                      <span>{{ $t('application.yes') }}</span>
                    </label>
                  </div>
                </div>

                <!-- Co-funders List -->
                <div v-if="form.hasCofunding === 'yes'" class="border-t pt-6">
                  <div class="flex justify-between items-center mb-4">
                    <h4 class="text-lg font-semibold text-gray-900">{{ $t('application.cofunders') }}</h4>
                    <button
                      type="button"
                      @click="addCofunder"
                      class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
                    >
                      + {{ $t('application.addCofunder') }}
                    </button>
                  </div>

                  <div v-for="(cofunder, index) in form.cofunders" :key="index" class="border border-gray-200 rounded-lg p-4 mb-4">
                    <div class="flex justify-between items-center mb-4">
                      <h5 class="font-semibold text-gray-900">{{ $t('application.cofunders') }} {{ index + 1 }}</h5>
                      <button
                        type="button"
                        @click="removeCofunder(index)"
                        class="text-red-500 hover:text-red-700 text-sm font-medium"
                        v-if="form.cofunders.length > 1"
                      >
                        {{ $t('application.removeCofunder') }}
                      </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.firstName') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="cofunder.name"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.orgIdentificationCode') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="cofunder.idCode"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.orgHead') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="cofunder.head"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.address') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="cofunder.address"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.phone') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="cofunder.phone"
                          type="tel"
                          required
                          placeholder="+995XXXXXXXXX"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.email') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="cofunder.email"
                          type="email"
                          required
                          @input="restrictToEmailChars('cofunders', $event, index)"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Budget -->
            <div class="bg-gray-50 rounded-2xl p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4 font-headline">4. {{ $t('application.budget') }}</h3>
              
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ $t('application.requestedFromCreativeGeorgia') }} (₾) <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <input
                      v-model.number="form.requestedFromCreativeGeorgia"
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ $t('application.selfFunding') }} (₾) <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <input
                        v-model.number="form.selfFundingGel"
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ $t('application.coFinancingAmount') }} (₾) <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <input
                        v-model.number="form.coFundingGel"
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                    </div>
                  </div>
                </div>

                <!-- Total Budget (Auto-calculated) -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ $t('application.totalBudget') }} (₾) <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <input
                      :value="totalBudgetCalculated"
                      type="number"
                      readonly
                      class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">{{ $t('application.autoCalculated') }}</p>
                </div>
              </div>
            </div>

            <!-- Project Description -->
            <div class="bg-gray-50 rounded-2xl p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4 font-headline">5. {{ $t('application.projectDescription') }}</h3>
              
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ $t('application.projectDescription') }} ({{ $t('application.max800Words') }}) <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="form.projectDescription"
                    rows="10"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    :placeholder="$t('application.projectDescriptionPlaceholder')"
                  ></textarea>
                  <p class="text-xs text-gray-500 mt-1">{{ wordCount(form.projectDescription) }} / 800 {{ $t('application.words') }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ $t('application.evaluationCriteria') }} ({{ $t('application.max100Words') }}) <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="form.evaluationCriteria"
                    rows="5"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    :placeholder="$t('application.evaluationCriteriaPlaceholder')"
                  ></textarea>
                  <p class="text-xs text-gray-500 mt-1">{{ wordCount(form.evaluationCriteria) }} / 100 {{ $t('application.words') }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ $t('application.relevantExperience') }} <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="form.experience"
                    rows="8"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    :placeholder="$t('application.relevantExperiencePlaceholder')"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Project Stages -->
            <div class="bg-gray-50 rounded-2xl p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-4 font-headline">6. {{ $t('application.projectStages') }}</h3>
              
              <div class="space-y-6">
                <div v-for="(stage, index) in form.stages" :key="index" class="border border-gray-200 rounded-lg p-4">
                  <div class="flex justify-between items-center mb-4">
                    <h4 class="font-semibold text-gray-900">{{ $t('application.stage') }} {{ index + 1 }}</h4>
                    <button 
                      type="button"
                      @click="removeStage(index)"
                      class="text-red-500 hover:text-red-700 text-sm font-medium"
                      v-if="form.stages.length > 1"
                    >
                      {{ $t('application.removeStage') }}
                    </button>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        {{ $t('application.stageName') }} <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="stage.name"
                        type="text"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        {{ $t('application.stagePerformer') }} <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="stage.assignee"
                        type="text"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        {{ $t('application.startDate') }} <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="stage.startDate"
                        type="date"
                        required
                        :min="form.startDate"
                        :max="form.endDate"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        {{ $t('application.endDate') }} <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="stage.endDate"
                        type="date"
                        required
                        :min="stage.startDate || form.startDate"
                        :max="form.endDate"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        {{ $t('application.stageLocation') }} <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="stage.location"
                        type="text"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  @click="addStage"
                  class="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-gray-600 hover:text-primary-600 font-medium"
                >
                  + {{ $t('application.addStage') }}
                </button>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between pt-6">
              <button
                type="button"
                @click="prevStep"
                class="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors duration-200 font-headline"
              >
                {{ $t('application.previous') }}
              </button>
              <button
                type="submit"
                class="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-headline"
              >
                {{ $t('application.next') }}
              </button>
            </div>
          </form>
        </div>

        <!-- Step 3: Financial Statement -->
        <div v-if="currentStep === 3">
          <h2 class="text-3xl font-bold text-gray-900 mb-6 font-headline">{{ $t('application.step3Title') }}</h2>
          
          <!-- Instructions -->
          <div class="bg-primary-50 border-l-4 border-primary-500 p-6 mb-8">
            <p class="text-gray-800 text-base leading-relaxed">
              პროექტის ხარჯთაღრიცხვა წარმოდგენილ უნდა იქნეს ლარში. აღნიშნული გრაფები შესაძლებელია შეივსოს საჭიროებიდან გამომდინარე (მითითებული თანხები უნდა შეიცავდეს საქართველოს კანონმდებლობით დადგენილ გადასახადებს)
            </p>
          </div>
          
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Expense Categories -->
            <div class="space-y-8">
              <!-- Category 1: Labor -->
              <div class="bg-gray-50 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-4 font-headline">1. {{ $t('application.expenseCategory1') }}</h3>
                
                <div class="space-y-6">
                  <div v-for="(expense, index) in form.expenseCategories.labor" :key="'labor-' + index" class="border border-gray-200 rounded-lg p-4 bg-white">
                    <div class="flex justify-between items-center mb-4">
                      <h4 class="font-semibold text-gray-900">{{ index + 1 }}</h4>
                      <button
                        type="button"
                        @click="removeExpenseFromCategory('labor', index)"
                        class="text-red-500 hover:text-red-700 text-sm font-medium"
                        v-if="form.expenseCategories.labor.length > 1"
                      >
                        {{ $t('application.removeExpense') }}
                      </button>
                    </div>

                    <div class="space-y-4">
                      <!-- Name -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseName') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="expense.name"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <!-- Unit -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseUnit') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="expense.unit"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <!-- Quantity, Unit Price, Total -->
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseQuantity') }} <span class="text-red-500">*</span>
                          </label>
                          <input
                            v-model.number="expense.quantity"
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            @input="calculateFunding(expense, 'quantity')"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseUnitPrice') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.unitPrice"
                              type="number"
                              required
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'unitPrice')"
                              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseTotal') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              :value="(expense.quantity || 0) * (expense.unitPrice || 0)"
                              type="number"
                              readonly
                              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>
                      </div>

                      <!-- Creative Georgia Amount -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseCreativeGeorgia') }} (₾) <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                          <input
                            v-model.number="expense.creativeGeorgiaAmount"
                            type="number"
                            min="0"
                            step="0.01"
                            @input="calculateFunding(expense, 'creativeGeorgia')"
                            :class="expense.autoCalculatedField === 'creativeGeorgia' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                          />
                          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                        </div>
                      </div>

                      <!-- Self Funding, Other Funding -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseSelfFunding') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.selfFunding"
                              type="number"
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'selfFunding')"
                              :class="expense.autoCalculatedField === 'selfFunding' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseOtherFunding') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.otherFunding"
                              type="number"
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'otherFunding')"
                              :class="expense.autoCalculatedField === 'otherFunding' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    @click="addExpenseToCategory('labor')"
                    class="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-gray-600 hover:text-primary-600 font-medium"
                  >
                    + {{ $t('application.addExpense') }}
                  </button>
                </div>
              </div>

              <!-- Category 2: Honorarium -->
              <div class="bg-gray-50 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-4 font-headline">2. {{ $t('application.expenseCategory2') }}</h3>
                
                <div class="space-y-6">
                  <div v-for="(expense, index) in form.expenseCategories.honorarium" :key="'honorarium-' + index" class="border border-gray-200 rounded-lg p-4 bg-white">
                    <div class="flex justify-between items-center mb-4">
                      <h4 class="font-semibold text-gray-900">{{ index + 1 }}</h4>
                      <button
                        type="button"
                        @click="removeExpenseFromCategory('honorarium', index)"
                        class="text-red-500 hover:text-red-700 text-sm font-medium"
                        v-if="form.expenseCategories.honorarium.length > 1"
                      >
                        {{ $t('application.removeExpense') }}
                      </button>
                    </div>

                    <div class="space-y-4">
                      <!-- Name -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseName') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="expense.name"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <!-- Unit -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseUnit') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="expense.unit"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <!-- Quantity, Unit Price, Total -->
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseQuantity') }} <span class="text-red-500">*</span>
                          </label>
                          <input
                            v-model.number="expense.quantity"
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            @input="calculateFunding(expense, 'quantity')"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseUnitPrice') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.unitPrice"
                              type="number"
                              required
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'unitPrice')"
                              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseTotal') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              :value="(expense.quantity || 0) * (expense.unitPrice || 0)"
                              type="number"
                              readonly
                              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>
                      </div>

                      <!-- Creative Georgia Amount -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseCreativeGeorgia') }} (₾) <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                          <input
                            v-model.number="expense.creativeGeorgiaAmount"
                            type="number"
                            min="0"
                            step="0.01"
                            @input="calculateFunding(expense, 'creativeGeorgia')"
                            :class="expense.autoCalculatedField === 'creativeGeorgia' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                          />
                          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                        </div>
                      </div>

                      <!-- Self Funding, Other Funding -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseSelfFunding') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.selfFunding"
                              type="number"
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'selfFunding')"
                              :class="expense.autoCalculatedField === 'selfFunding' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseOtherFunding') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.otherFunding"
                              type="number"
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'otherFunding')"
                              :class="expense.autoCalculatedField === 'otherFunding' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    @click="addExpenseToCategory('honorarium')"
                    class="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-gray-600 hover:text-primary-600 font-medium"
                  >
                    + {{ $t('application.addExpense') }}
                  </button>
                </div>
              </div>

              <!-- Category 3: Transport -->
              <div class="bg-gray-50 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-4 font-headline">3. {{ $t('application.expenseCategory3') }}</h3>
                
                <div class="space-y-6">
                  <div v-for="(expense, index) in form.expenseCategories.transport" :key="'transport-' + index" class="border border-gray-200 rounded-lg p-4 bg-white">
                    <div class="flex justify-between items-center mb-4">
                      <h4 class="font-semibold text-gray-900">{{ index + 1 }}</h4>
                      <button
                        type="button"
                        @click="removeExpenseFromCategory('transport', index)"
                        class="text-red-500 hover:text-red-700 text-sm font-medium"
                        v-if="form.expenseCategories.transport.length > 1"
                      >
                        {{ $t('application.removeExpense') }}
                      </button>
                    </div>

                    <div class="space-y-4">
                      <!-- Name -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseName') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="expense.name"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <!-- Unit -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseUnit') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="expense.unit"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <!-- Quantity, Unit Price, Total -->
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseQuantity') }} <span class="text-red-500">*</span>
                          </label>
                          <input
                            v-model.number="expense.quantity"
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            @input="calculateFunding(expense, 'quantity')"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseUnitPrice') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.unitPrice"
                              type="number"
                              required
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'unitPrice')"
                              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseTotal') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              :value="(expense.quantity || 0) * (expense.unitPrice || 0)"
                              type="number"
                              readonly
                              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>
                      </div>

                      <!-- Creative Georgia Amount -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseCreativeGeorgia') }} (₾) <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                          <input
                            v-model.number="expense.creativeGeorgiaAmount"
                            type="number"
                            min="0"
                            step="0.01"
                            @input="calculateFunding(expense, 'creativeGeorgia')"
                            :class="expense.autoCalculatedField === 'creativeGeorgia' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                          />
                          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                        </div>
                      </div>

                      <!-- Self Funding, Other Funding -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseSelfFunding') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.selfFunding"
                              type="number"
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'selfFunding')"
                              :class="expense.autoCalculatedField === 'selfFunding' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseOtherFunding') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.otherFunding"
                              type="number"
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'otherFunding')"
                              :class="expense.autoCalculatedField === 'otherFunding' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    @click="addExpenseToCategory('transport')"
                    class="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-gray-600 hover:text-primary-600 font-medium"
                  >
                    + {{ $t('application.addExpense') }}
                  </button>
                </div>
              </div>

              <!-- Category 4: Living -->
              <div class="bg-gray-50 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-4 font-headline">4. {{ $t('application.expenseCategory4') }}</h3>
                
                <div class="space-y-6">
                  <div v-for="(expense, index) in form.expenseCategories.living" :key="'living-' + index" class="border border-gray-200 rounded-lg p-4 bg-white">
                    <div class="flex justify-between items-center mb-4">
                      <h4 class="font-semibold text-gray-900">{{ index + 1 }}</h4>
                      <button
                        type="button"
                        @click="removeExpenseFromCategory('living', index)"
                        class="text-red-500 hover:text-red-700 text-sm font-medium"
                        v-if="form.expenseCategories.living.length > 1"
                      >
                        {{ $t('application.removeExpense') }}
                      </button>
                    </div>

                    <div class="space-y-4">
                      <!-- Name -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseName') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="expense.name"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <!-- Unit -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseUnit') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="expense.unit"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <!-- Quantity, Unit Price, Total -->
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseQuantity') }} <span class="text-red-500">*</span>
                          </label>
                          <input
                            v-model.number="expense.quantity"
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            @input="calculateFunding(expense, 'quantity')"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseUnitPrice') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.unitPrice"
                              type="number"
                              required
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'unitPrice')"
                              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseTotal') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              :value="(expense.quantity || 0) * (expense.unitPrice || 0)"
                              type="number"
                              readonly
                              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>
                      </div>

                      <!-- Creative Georgia Amount -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseCreativeGeorgia') }} (₾) <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                          <input
                            v-model.number="expense.creativeGeorgiaAmount"
                            type="number"
                            min="0"
                            step="0.01"
                            @input="calculateFunding(expense, 'creativeGeorgia')"
                            :class="expense.autoCalculatedField === 'creativeGeorgia' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                          />
                          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                        </div>
                      </div>

                      <!-- Self Funding, Other Funding -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseSelfFunding') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.selfFunding"
                              type="number"
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'selfFunding')"
                              :class="expense.autoCalculatedField === 'selfFunding' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseOtherFunding') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.otherFunding"
                              type="number"
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'otherFunding')"
                              :class="expense.autoCalculatedField === 'otherFunding' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    @click="addExpenseToCategory('living')"
                    class="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-gray-600 hover:text-primary-600 font-medium"
                  >
                    + {{ $t('application.addExpense') }}
                  </button>
                </div>
              </div>

              <!-- Category 5: Rent -->
              <div class="bg-gray-50 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-4 font-headline">5. {{ $t('application.expenseCategory5') }}</h3>
                
                <div class="space-y-6">
                  <div v-for="(expense, index) in form.expenseCategories.rent" :key="'rent-' + index" class="border border-gray-200 rounded-lg p-4 bg-white">
                    <div class="flex justify-between items-center mb-4">
                      <h4 class="font-semibold text-gray-900">{{ index + 1 }}</h4>
                      <button
                        type="button"
                        @click="removeExpenseFromCategory('rent', index)"
                        class="text-red-500 hover:text-red-700 text-sm font-medium"
                        v-if="form.expenseCategories.rent.length > 1"
                      >
                        {{ $t('application.removeExpense') }}
                      </button>
                    </div>

                    <div class="space-y-4">
                      <!-- Name -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseName') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="expense.name"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <!-- Unit -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseUnit') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="expense.unit"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <!-- Quantity, Unit Price, Total -->
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseQuantity') }} <span class="text-red-500">*</span>
                          </label>
                          <input
                            v-model.number="expense.quantity"
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            @input="calculateFunding(expense, 'quantity')"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseUnitPrice') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.unitPrice"
                              type="number"
                              required
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'unitPrice')"
                              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseTotal') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              :value="(expense.quantity || 0) * (expense.unitPrice || 0)"
                              type="number"
                              readonly
                              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>
                      </div>

                      <!-- Creative Georgia Amount -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseCreativeGeorgia') }} (₾) <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                          <input
                            v-model.number="expense.creativeGeorgiaAmount"
                            type="number"
                            min="0"
                            step="0.01"
                            @input="calculateFunding(expense, 'creativeGeorgia')"
                            :class="expense.autoCalculatedField === 'creativeGeorgia' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                          />
                          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                        </div>
                      </div>

                      <!-- Self Funding, Other Funding -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseSelfFunding') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.selfFunding"
                              type="number"
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'selfFunding')"
                              :class="expense.autoCalculatedField === 'selfFunding' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseOtherFunding') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.otherFunding"
                              type="number"
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'otherFunding')"
                              :class="expense.autoCalculatedField === 'otherFunding' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    @click="addExpenseToCategory('rent')"
                    class="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-gray-600 hover:text-primary-600 font-medium"
                  >
                    + {{ $t('application.addExpense') }}
                  </button>
                </div>
              </div>

              <!-- Category 6: Exhibition -->
              <div class="bg-gray-50 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-4 font-headline">6. {{ $t('application.expenseCategory6') }}</h3>
                
                <div class="space-y-6">
                  <div v-for="(expense, index) in form.expenseCategories.exhibition" :key="'exhibition-' + index" class="border border-gray-200 rounded-lg p-4 bg-white">
                    <div class="flex justify-between items-center mb-4">
                      <h4 class="font-semibold text-gray-900">{{ index + 1 }}</h4>
                      <button
                        type="button"
                        @click="removeExpenseFromCategory('exhibition', index)"
                        class="text-red-500 hover:text-red-700 text-sm font-medium"
                        v-if="form.expenseCategories.exhibition.length > 1"
                      >
                        {{ $t('application.removeExpense') }}
                      </button>
                    </div>

                    <div class="space-y-4">
                      <!-- Name -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseName') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="expense.name"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <!-- Unit -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseUnit') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="expense.unit"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <!-- Quantity, Unit Price, Total -->
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseQuantity') }} <span class="text-red-500">*</span>
                          </label>
                          <input
                            v-model.number="expense.quantity"
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            @input="calculateFunding(expense, 'quantity')"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseUnitPrice') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.unitPrice"
                              type="number"
                              required
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'unitPrice')"
                              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseTotal') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              :value="(expense.quantity || 0) * (expense.unitPrice || 0)"
                              type="number"
                              readonly
                              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>
                      </div>

                      <!-- Creative Georgia Amount -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseCreativeGeorgia') }} (₾) <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                          <input
                            v-model.number="expense.creativeGeorgiaAmount"
                            type="number"
                            min="0"
                            step="0.01"
                            @input="calculateFunding(expense, 'creativeGeorgia')"
                            :class="expense.autoCalculatedField === 'creativeGeorgia' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                          />
                          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                        </div>
                      </div>

                      <!-- Self Funding, Other Funding -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseSelfFunding') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.selfFunding"
                              type="number"
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'selfFunding')"
                              :class="expense.autoCalculatedField === 'selfFunding' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseOtherFunding') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.otherFunding"
                              type="number"
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'otherFunding')"
                              :class="expense.autoCalculatedField === 'otherFunding' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    @click="addExpenseToCategory('exhibition')"
                    class="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-gray-600 hover:text-primary-600 font-medium"
                  >
                    + {{ $t('application.addExpense') }}
                  </button>
                </div>
              </div>

              <!-- Category 7: Printing -->
              <div class="bg-gray-50 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-4 font-headline">7. {{ $t('application.expenseCategory7') }}</h3>
                
                <div class="space-y-6">
                  <div v-for="(expense, index) in form.expenseCategories.printing" :key="'printing-' + index" class="border border-gray-200 rounded-lg p-4 bg-white">
                    <div class="flex justify-between items-center mb-4">
                      <h4 class="font-semibold text-gray-900">{{ index + 1 }}</h4>
                      <button
                        type="button"
                        @click="removeExpenseFromCategory('printing', index)"
                        class="text-red-500 hover:text-red-700 text-sm font-medium"
                        v-if="form.expenseCategories.printing.length > 1"
                      >
                        {{ $t('application.removeExpense') }}
                      </button>
                    </div>

                    <div class="space-y-4">
                      <!-- Name -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseName') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="expense.name"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <!-- Unit -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseUnit') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="expense.unit"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <!-- Quantity, Unit Price, Total -->
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseQuantity') }} <span class="text-red-500">*</span>
                          </label>
                          <input
                            v-model.number="expense.quantity"
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            @input="calculateFunding(expense, 'quantity')"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseUnitPrice') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.unitPrice"
                              type="number"
                              required
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'unitPrice')"
                              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseTotal') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              :value="(expense.quantity || 0) * (expense.unitPrice || 0)"
                              type="number"
                              readonly
                              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>
                      </div>

                      <!-- Creative Georgia Amount -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseCreativeGeorgia') }} (₾) <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                          <input
                            v-model.number="expense.creativeGeorgiaAmount"
                            type="number"
                            min="0"
                            step="0.01"
                            @input="calculateFunding(expense, 'creativeGeorgia')"
                            :class="expense.autoCalculatedField === 'creativeGeorgia' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                          />
                          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                        </div>
                      </div>

                      <!-- Self Funding, Other Funding -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseSelfFunding') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.selfFunding"
                              type="number"
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'selfFunding')"
                              :class="expense.autoCalculatedField === 'selfFunding' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseOtherFunding') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.otherFunding"
                              type="number"
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'otherFunding')"
                              :class="expense.autoCalculatedField === 'otherFunding' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    @click="addExpenseToCategory('printing')"
                    class="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-gray-600 hover:text-primary-600 font-medium"
                  >
                    + {{ $t('application.addExpense') }}
                  </button>
                </div>
              </div>

              <!-- Category 8: Other -->
              <div class="bg-gray-50 rounded-2xl p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-4 font-headline">8. {{ $t('application.expenseCategory8') }}</h3>
                
                <div class="space-y-6">
                  <div v-for="(expense, index) in form.expenseCategories.other" :key="'other-' + index" class="border border-gray-200 rounded-lg p-4 bg-white">
                    <div class="flex justify-between items-center mb-4">
                      <h4 class="font-semibold text-gray-900">{{ index + 1 }}</h4>
                      <button
                        type="button"
                        @click="removeExpenseFromCategory('other', index)"
                        class="text-red-500 hover:text-red-700 text-sm font-medium"
                        v-if="form.expenseCategories.other.length > 1"
                      >
                        {{ $t('application.removeExpense') }}
                      </button>
                    </div>

                    <div class="space-y-4">
                      <!-- Name -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseName') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="expense.name"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <!-- Unit -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseUnit') }} <span class="text-red-500">*</span>
                        </label>
                        <input
                          v-model="expense.unit"
                          type="text"
                          required
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <!-- Quantity, Unit Price, Total -->
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseQuantity') }} <span class="text-red-500">*</span>
                          </label>
                          <input
                            v-model.number="expense.quantity"
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            @input="calculateFunding(expense, 'quantity')"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseUnitPrice') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.unitPrice"
                              type="number"
                              required
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'unitPrice')"
                              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseTotal') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              :value="(expense.quantity || 0) * (expense.unitPrice || 0)"
                              type="number"
                              readonly
                              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>
                      </div>

                      <!-- Creative Georgia Amount -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                          {{ $t('application.expenseCreativeGeorgia') }} (₾) <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                          <input
                            v-model.number="expense.creativeGeorgiaAmount"
                            type="number"
                            min="0"
                            step="0.01"
                            @input="calculateFunding(expense, 'creativeGeorgia')"
                            :class="expense.autoCalculatedField === 'creativeGeorgia' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                          />
                          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                        </div>
                      </div>

                      <!-- Self Funding, Other Funding -->
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseSelfFunding') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.selfFunding"
                              type="number"
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'selfFunding')"
                              :class="expense.autoCalculatedField === 'selfFunding' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>

                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">
                            {{ $t('application.expenseOtherFunding') }} (₾) <span class="text-red-500">*</span>
                          </label>
                          <div class="relative">
                            <input
                              v-model.number="expense.otherFunding"
                              type="number"
                              min="0"
                              step="0.01"
                              @input="calculateFunding(expense, 'otherFunding')"
                              :class="expense.autoCalculatedField === 'otherFunding' ? 'w-full px-4 py-3 pl-12 border border-primary-300 rounded-lg bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all' : 'w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all'"
                            />
                            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₾</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    @click="addExpenseToCategory('other')"
                    class="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-gray-600 hover:text-primary-600 font-medium"
                  >
                    + {{ $t('application.addExpense') }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Totals Summary -->
            <div class="mt-6">
                <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h4 class="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">{{ $t('application.totalSummary') }}</h4>
                  
                  <div class="flex flex-wrap justify-between items-center gap-4 mb-4">
                    <!-- Total Creative Georgia -->
                    <div class="text-center p-3 bg-gray-50 rounded-lg flex-1 min-w-[200px]">
                      <p class="text-xs text-gray-600 mb-1">{{ $t('application.expenseCreativeGeorgia') }}</p>
                      <p class="text-xl font-bold text-primary-600">{{ expenseTotalCreativeGeorgia.toFixed(2) }} ₾</p>
                    </div>
                    
                    <!-- Total Self Funding -->
                    <div class="text-center p-3 bg-gray-50 rounded-lg flex-1 min-w-[200px]">
                      <p class="text-xs text-gray-600 mb-1">{{ $t('application.expenseSelfFunding') }}</p>
                      <p class="text-xl font-bold text-primary-600">{{ expenseTotalSelfFunding.toFixed(2) }} ₾</p>
                    </div>
                    
                    <!-- Total Other Funding -->
                    <div class="text-center p-3 bg-gray-50 rounded-lg flex-1 min-w-[200px]">
                      <p class="text-xs text-gray-600 mb-1">{{ $t('application.expenseOtherFunding') }}</p>
                      <p class="text-xl font-bold text-primary-600">{{ expenseTotalOtherFunding.toFixed(2) }} ₾</p>
                    </div>
                  </div>
                  
                  <!-- Grand Total -->
                  <div class="text-center p-4 bg-primary-500 rounded-lg">
                    <p class="text-sm text-white mb-1 opacity-90">{{ $t('application.expenseTotal') }}</p>
                    <p class="text-3xl font-bold text-white">{{ expenseGrandTotal.toFixed(2) }} ₾</p>
                  </div>

                  <!-- Budget Mismatch Warning -->
                  <div v-if="budgetMismatch.hasMismatch" class="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="ml-3 flex-1">
                        <h3 class="text-sm font-bold text-red-800 mb-2">{{ $t('application.budgetMismatchTitle') }}</h3>
                        <div class="text-sm text-red-700 space-y-1">
                          <p>{{ $t('application.budgetMismatchMessage') }}</p>
                          <div class="mt-2 bg-white bg-opacity-50 rounded p-2">
                            <p class="font-semibold">{{ $t('application.totalBudgetStep2') }}: <span class="text-red-800">{{ budgetMismatch.totalBudget.toFixed(2) }} ₾</span></p>
                            <p class="font-semibold">{{ $t('application.expensesTotal') }}: <span class="text-red-800">{{ budgetMismatch.expenseTotal.toFixed(2) }} ₾</span></p>
                            <p class="font-semibold text-red-900">{{ $t('application.difference') }}: {{ budgetMismatch.difference.toFixed(2) }} ₾</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            <!-- Agreements -->
            <div class="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200">
              <div class="flex items-center mb-6">
                <svg class="w-6 h-6 text-primary-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <h3 class="text-2xl font-bold text-gray-900 font-headline">{{ $t('application.agreements') }}</h3>
              </div>
              
              <p class="text-sm text-gray-600 mb-6 bg-primary-50 p-4 rounded-lg border-l-4 border-primary-400">
                {{ $t('application.agreementsDescription') }}
              </p>

              <div class="space-y-3">
                <!-- Agreement 1: Logo Placement -->
                <div 
                  class="group relative rounded-xl p-5 transition-all duration-200"
                  :class="[
                    form.agreements.logoPlacement ? 'bg-green-50 border-2 border-green-500 shadow-sm' : 
                    agreementsRead.logoPlacement ? 'bg-gray-50 border-2 border-gray-200 hover:border-primary-300 cursor-pointer' : 
                    'bg-gray-100 border-2 border-gray-200 opacity-75'
                  ]"
                  @click="agreementsRead.logoPlacement && (form.agreements.logoPlacement = !form.agreements.logoPlacement)"
                >
                  <div class="flex items-start">
                    <div class="flex items-center h-6">
                      <input 
                        type="checkbox" 
                        required 
                        v-model="form.agreements.logoPlacement"
                        :disabled="!agreementsRead.logoPlacement"
                        class="w-6 h-6 text-primary-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-primary-500" 
                        :class="agreementsRead.logoPlacement ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'"
                        @click.stop
                      />
                    </div>
                    <div class="ml-4 flex-1">
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-sm font-semibold text-gray-900">1. {{ $t('application.agreement1Title') }}</span>
                        <button 
                          type="button"
                          @click.stop="openAgreementModal('logoPlacement')"
                          class="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center"
                          :class="agreementsRead.logoPlacement ? 'bg-green-100 text-green-700' : 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm'"
                        >
                          <svg v-if="agreementsRead.logoPlacement" class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                          {{ agreementsRead.logoPlacement ? $t('application.readComplete') : $t('application.readMore') }}
                          <svg v-if="!agreementsRead.logoPlacement" class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                      <p class="text-sm text-gray-600">{{ $t('application.agreement1Short') }}</p>
                      <p v-if="!agreementsRead.logoPlacement" class="text-xs text-amber-600 mt-2 flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                        </svg>
                        {{ $t('application.mustReadFirst') }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Agreement 2: Personal Data -->
                <div 
                  class="group relative rounded-xl p-5 transition-all duration-200"
                  :class="[
                    form.agreements.personalData ? 'bg-green-50 border-2 border-green-500 shadow-sm' : 
                    agreementsRead.personalData ? 'bg-gray-50 border-2 border-gray-200 hover:border-primary-300 cursor-pointer' : 
                    'bg-gray-100 border-2 border-gray-200 opacity-75'
                  ]"
                  @click="agreementsRead.personalData && (form.agreements.personalData = !form.agreements.personalData)"
                >
                  <div class="flex items-start">
                    <div class="flex items-center h-6">
                      <input 
                        type="checkbox" 
                        required 
                        v-model="form.agreements.personalData"
                        :disabled="!agreementsRead.personalData"
                        class="w-6 h-6 text-primary-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-primary-500" 
                        :class="agreementsRead.personalData ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'"
                        @click.stop
                      />
                    </div>
                    <div class="ml-4 flex-1">
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-sm font-semibold text-gray-900">2. {{ $t('application.agreement2Title') }}</span>
                        <button 
                          type="button"
                          @click.stop="openAgreementModal('personalData')"
                          class="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center"
                          :class="agreementsRead.personalData ? 'bg-green-100 text-green-700' : 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm'"
                        >
                          <svg v-if="agreementsRead.personalData" class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                          {{ agreementsRead.personalData ? $t('application.readComplete') : $t('application.readMore') }}
                          <svg v-if="!agreementsRead.personalData" class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                      <p class="text-sm text-gray-600">{{ $t('application.agreement2Short') }}</p>
                      <p v-if="!agreementsRead.personalData" class="text-xs text-amber-600 mt-2 flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                        </svg>
                        {{ $t('application.mustReadFirst') }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Agreement 3: Funding Terms -->
                <div 
                  class="group relative rounded-xl p-5 transition-all duration-200"
                  :class="[
                    form.agreements.fundingTerms ? 'bg-green-50 border-2 border-green-500 shadow-sm' : 
                    agreementsRead.fundingTerms ? 'bg-gray-50 border-2 border-gray-200 hover:border-primary-300 cursor-pointer' : 
                    'bg-gray-100 border-2 border-gray-200 opacity-75'
                  ]"
                  @click="agreementsRead.fundingTerms && (form.agreements.fundingTerms = !form.agreements.fundingTerms)"
                >
                  <div class="flex items-start">
                    <div class="flex items-center h-6">
                      <input 
                        type="checkbox" 
                        required 
                        v-model="form.agreements.fundingTerms"
                        :disabled="!agreementsRead.fundingTerms"
                        class="w-6 h-6 text-primary-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-primary-500" 
                        :class="agreementsRead.fundingTerms ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'"
                        @click.stop
                      />
                    </div>
                    <div class="ml-4 flex-1">
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-sm font-semibold text-gray-900">3. {{ $t('application.agreement3Title') }}</span>
                        <button 
                          type="button"
                          @click.stop="openAgreementModal('fundingTerms')"
                          class="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center"
                          :class="agreementsRead.fundingTerms ? 'bg-green-100 text-green-700' : 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm'"
                        >
                          <svg v-if="agreementsRead.fundingTerms" class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                          {{ agreementsRead.fundingTerms ? $t('application.readComplete') : $t('application.readMore') }}
                          <svg v-if="!agreementsRead.fundingTerms" class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                      <p class="text-sm text-gray-600">{{ $t('application.agreement3Short') }}</p>
                      <p v-if="!agreementsRead.fundingTerms" class="text-xs text-amber-600 mt-2 flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                        </svg>
                        {{ $t('application.mustReadFirst') }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Agreement 4: Declaration -->
                <div 
                  class="group relative rounded-xl p-5 transition-all duration-200"
                  :class="[
                    form.agreements.declaration ? 'bg-green-50 border-2 border-green-500 shadow-sm' : 
                    agreementsRead.declaration ? 'bg-gray-50 border-2 border-gray-200 hover:border-primary-300 cursor-pointer' : 
                    'bg-gray-100 border-2 border-gray-200 opacity-75'
                  ]"
                  @click="agreementsRead.declaration && (form.agreements.declaration = !form.agreements.declaration)"
                >
                  <div class="flex items-start">
                    <div class="flex items-center h-6">
                      <input 
                        type="checkbox" 
                        required 
                        v-model="form.agreements.declaration"
                        :disabled="!agreementsRead.declaration"
                        class="w-6 h-6 text-primary-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-primary-500" 
                        :class="agreementsRead.declaration ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'"
                        @click.stop
                      />
                    </div>
                    <div class="ml-4 flex-1">
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-sm font-semibold text-gray-900">4. {{ $t('application.agreement4Title') }}</span>
                        <button 
                          type="button"
                          @click.stop="openAgreementModal('declaration')"
                          class="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center"
                          :class="agreementsRead.declaration ? 'bg-green-100 text-green-700' : 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm'"
                        >
                          <svg v-if="agreementsRead.declaration" class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                          {{ agreementsRead.declaration ? $t('application.readComplete') : $t('application.readMore') }}
                          <svg v-if="!agreementsRead.declaration" class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                      <p class="text-sm text-gray-600">{{ $t('application.agreement4Short') }}</p>
                      <p v-if="!agreementsRead.declaration" class="text-xs text-amber-600 mt-2 flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                        </svg>
                        {{ $t('application.mustReadFirst') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- All Checked Indicator -->
              <div v-if="form.agreements.logoPlacement && form.agreements.personalData && form.agreements.fundingTerms && form.agreements.declaration" 
                   class="mt-6 p-4 bg-green-100 border border-green-500 rounded-lg flex items-center">
                <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm font-semibold text-green-800">{{ $t('application.allAgreementsChecked') }}</span>
              </div>

              <!-- Electronic Signature Section -->
              <div v-if="form.agreements.logoPlacement && form.agreements.personalData && form.agreements.fundingTerms && form.agreements.declaration" 
                   class="mt-6 pt-6 border-t-2 border-gray-200">
                <div class="mb-4">
                  <h4 class="text-lg font-bold text-gray-900 flex items-center">
                    <svg class="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    {{ $t('application.signatureLabel') }}
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">{{ $t('application.signatureDescription') }}</p>
                </div>

                <!-- Signature Checkbox -->
                <div 
                  class="group relative rounded-xl p-6 transition-all duration-300 cursor-pointer border-2"
                  :class="form.signature 
                    ? 'bg-gradient-to-r from-primary-50 to-green-50 border-primary-500 shadow-lg' 
                    : 'bg-amber-50 border-amber-400 hover:border-amber-500 animate-pulse'"
                  @click="form.signature = !form.signature"
                >
                  <div class="flex items-start">
                    <div class="flex items-center h-6">
                      <input 
                        type="checkbox" 
                        required 
                        v-model="form.signature"
                        class="w-7 h-7 text-primary-600 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 cursor-pointer transition-transform hover:scale-110" 
                        @click.stop
                      />
                    </div>
                    <div class="ml-4 flex-1">
                      <div class="flex items-center mb-2">
                        <svg v-if="form.signature" class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                        <svg v-else class="w-5 h-5 text-amber-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-base font-bold" :class="form.signature ? 'text-green-800' : 'text-amber-800'">
                          {{ form.signature ? $t('application.signatureSigned') : $t('application.signatureRequired') }}
                        </span>
                      </div>
                      <p class="text-sm" :class="form.signature ? 'text-gray-700' : 'text-amber-700'">
                        {{ $t('application.signatureText') }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Final Ready Indicator -->
                <div v-if="form.signature" 
                     class="mt-4 p-4 bg-gradient-to-r from-green-100 to-primary-100 border-2 border-green-500 rounded-xl flex items-center shadow-md">
                  <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-bold text-green-800">{{ $t('application.readyToSubmit') }}</p>
                    <p class="text-xs text-green-700">{{ $t('application.readyToSubmitDescription') }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Agreement Modal -->
            <div 
              v-if="activeAgreementModal" 
              class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
              @click.self="closeAgreementModal"
            >
              <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col animate-fade-in">
                <!-- Header -->
                <div class="p-6 sm:p-8 border-b border-gray-200 flex justify-between items-start bg-gradient-to-r from-primary-50 to-white">
                  <div class="flex-1">
                    <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 font-headline mb-1">{{ $t(`application.${activeAgreementModal}Title`) }}</h3>
                    <p class="text-sm text-gray-600">{{ $t('application.reviewDetails') }}</p>
                  </div>
                  <button 
                    type="button"
                    @click="closeAgreementModal"
                    class="ml-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <!-- Content -->
                <div class="p-6 sm:p-8 overflow-y-auto flex-1">
                  <div class="prose prose-sm sm:prose max-w-none text-gray-700 leading-relaxed" v-html="$t(`application.${activeAgreementModal}Full`)"></div>
                </div>

                <!-- Footer -->
                <div class="p-6 sm:p-8 border-t border-gray-200 bg-gray-50">
                  <button
                    type="button"
                    @click="closeAgreementModal"
                    class="w-full px-6 py-4 rounded-xl font-semibold text-lg transition-all bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center"
                  >
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    {{ $t('application.agreeAndClose') }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between pt-6">
              <button
                type="button"
                @click="prevStep"
                class="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors duration-200 font-headline"
              >
                {{ $t('application.previous') }}
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="px-8 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-headline disabled:transform-none flex items-center justify-center gap-2"
              >
                <svg
                  v-if="isSubmitting"
                  class="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isSubmitting ? $t('application.loading') : $t('application.submitLabel') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Beautiful Modal -->
    <Transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div
          class="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-fade-in"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="p-6 pb-4">
            <div class="flex items-center justify-center mb-4">
              <!-- Success Icon -->
              <div
                v-if="modalConfig.type === 'success'"
                class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center"
              >
                <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <!-- Error Icon -->
              <div
                v-else-if="modalConfig.type === 'error'"
                class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center"
              >
                <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              
              <!-- Warning Icon -->
              <div
                v-else
                class="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center"
              >
                <svg class="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
            </div>
            
            <h3 class="text-2xl font-bold text-center text-gray-900 mb-2 font-headline">
              {{ modalConfig.title }}
            </h3>
            <p class="text-center text-gray-600 leading-relaxed">
              {{ modalConfig.message }}
            </p>
          </div>

          <!-- Modal Footer -->
          <div class="p-6 pt-2 border-t border-gray-100">
            <button
              @click="closeModal"
              class="w-full px-6 py-3 rounded-xl font-semibold text-lg transition-all transform hover:scale-105"
              :class="{
                'bg-green-500 hover:bg-green-600 text-white': modalConfig.type === 'success',
                'bg-red-500 hover:bg-red-600 text-white': modalConfig.type === 'error',
                'bg-yellow-500 hover:bg-yellow-600 text-white': modalConfig.type === 'warning'
              }"
            >
              {{ modalConfig.type === 'success' ? $t('application.ok') : $t('application.close') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft, Check } from 'lucide-vue-next'
import api from '../api/axios'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

// Determine current step from route name
const currentStep = computed(() => {
  const routeName = route.name as string
  if (routeName === 'application-step-1') return 1
  if (routeName === 'application-step-2') return 2
  if (routeName === 'application-step-3') return 3
  return 1
})

const isSubmitting = ref(false)

// Modal state
const showModal = ref(false)
const modalConfig = reactive({
  title: '',
  message: '',
  type: 'success' as 'success' | 'error' | 'warning',
  onConfirm: () => {}
})

const openModal = (title: string, message: string, type: 'success' | 'error' | 'warning' = 'success', onConfirm?: () => void) => {
  modalConfig.title = title
  modalConfig.message = message
  modalConfig.type = type
  modalConfig.onConfirm = onConfirm || (() => { showModal.value = false })
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  modalConfig.onConfirm()
}

// Current date for signature
// Agreement modal state
type AgreementType = 'logoPlacement' | 'personalData' | 'fundingTerms' | 'declaration'

const activeAgreementModal = ref<AgreementType | null>(null)

// Track which agreements have been read (user must click "სრულად ნახვა" to enable checkbox)
const agreementsRead = reactive({
  logoPlacement: false,
  personalData: false,
  fundingTerms: false,
  declaration: false
})

// Open agreement modal
const openAgreementModal = (agreementType: AgreementType) => {
  activeAgreementModal.value = agreementType
}

// Close agreement modal and mark as read + auto-check
const closeAgreementModal = () => {
  if (activeAgreementModal.value) {
    // Mark as read
    agreementsRead[activeAgreementModal.value] = true
    // Auto-check the agreement
    form.agreements[activeAgreementModal.value] = true
  }
  activeAgreementModal.value = null
}

// Load form data from localStorage
const loadFormData = () => {
  const savedData = localStorage.getItem('applicationFormData')
  if (savedData) {
    try {
      return JSON.parse(savedData)
    } catch (e) {
      console.error('Error loading form data:', e)
      return null
    }
  }
  return null
}

// Initialize form with saved data or defaults
const savedForm = loadFormData()
const form = reactive({
  // Step 1 fields
  applicantName: savedForm?.applicantName || '',
  personalNumber: savedForm?.personalNumber || '',
  address: savedForm?.address || '',
  phone: savedForm?.phone || '',
  email: savedForm?.email || '',
  
  // Step 2 fields
  applicationType: savedForm?.applicationType || '',
  competitionTitle: savedForm?.competitionTitle || '',
  title: savedForm?.title || '',
  requestedAmountGel: savedForm?.requestedAmountGel || 0,
  startDate: savedForm?.startDate || '',
  endDate: savedForm?.endDate || '',
  applicantType: savedForm?.applicantType || '',
  
  // Legal entity fields
  orgName: savedForm?.orgName || '',
  orgIdCode: savedForm?.orgIdCode || '',
  orgHead: savedForm?.orgHead || '',
  orgAddress: savedForm?.orgAddress || '',
  orgPhone: savedForm?.orgPhone || '',
  orgEmail: savedForm?.orgEmail || '',
  
  // Individual fields
  personFullName: savedForm?.personFullName || '',
  personIdNumber: savedForm?.personIdNumber || '',
  personPhone: savedForm?.personPhone || '',
  personEmail: savedForm?.personEmail || '',
  
  // Contact person
  contactFullName: savedForm?.contactFullName || '',
  contactPersonalId: savedForm?.contactPersonalId || '',
  contactPhone: savedForm?.contactPhone || '',
  contactEmail: savedForm?.contactEmail || '',
  
  // Co-financing
  hasCofunding: savedForm?.hasCofunding || 'no',
  cofunders: savedForm?.cofunders || [{ name: '', idCode: '', head: '', address: '', phone: '', email: '' }],
  
  // Budget
  totalBudgetGel: savedForm?.totalBudgetGel || 0,
  requestedFromCreativeGeorgia: savedForm?.requestedFromCreativeGeorgia || 0,
  selfFundingGel: savedForm?.selfFundingGel || 0,
  coFundingGel: savedForm?.coFundingGel || 0,
  
  // Project details
  projectDescription: savedForm?.projectDescription || '',
  evaluationCriteria: savedForm?.evaluationCriteria || '',
  experience: savedForm?.experience || '',
  
  // Stages
  stages: savedForm?.stages || [{ name: '', assignee: '', startDate: '', endDate: '', location: '' }],
  
  // Expense items
  // Expense categories with repeatable items
  expenseCategories: savedForm?.expenseCategories || {
    labor: [{
      name: '',
      unit: '',
      quantity: 0,
      unitPrice: 0,
      creativeGeorgiaAmount: 0,
      selfFunding: 0,
      otherFunding: 0,
      lastEditedField: null,
      autoCalculatedField: 'otherFunding'
    }],
    honorarium: [{
      name: '',
      unit: '',
      quantity: 0,
      unitPrice: 0,
      creativeGeorgiaAmount: 0,
      selfFunding: 0,
      otherFunding: 0,
      lastEditedField: null,
      autoCalculatedField: 'otherFunding'
    }],
    transport: [{
      name: '',
      unit: '',
      quantity: 0,
      unitPrice: 0,
      creativeGeorgiaAmount: 0,
      selfFunding: 0,
      otherFunding: 0,
      lastEditedField: null,
      autoCalculatedField: 'otherFunding'
    }],
    living: [{
      name: '',
      unit: '',
      quantity: 0,
      unitPrice: 0,
      creativeGeorgiaAmount: 0,
      selfFunding: 0,
      otherFunding: 0,
      lastEditedField: null,
      autoCalculatedField: 'otherFunding'
    }],
    rent: [{
      name: '',
      unit: '',
      quantity: 0,
      unitPrice: 0,
      creativeGeorgiaAmount: 0,
      selfFunding: 0,
      otherFunding: 0,
      lastEditedField: null,
      autoCalculatedField: 'otherFunding'
    }],
    exhibition: [{
      name: '',
      unit: '',
      quantity: 0,
      unitPrice: 0,
      creativeGeorgiaAmount: 0,
      selfFunding: 0,
      otherFunding: 0,
      lastEditedField: null,
      autoCalculatedField: 'otherFunding'
    }],
    printing: [{
      name: '',
      unit: '',
      quantity: 0,
      unitPrice: 0,
      creativeGeorgiaAmount: 0,
      selfFunding: 0,
      otherFunding: 0,
      lastEditedField: null,
      autoCalculatedField: 'otherFunding'
    }],
    other: [{
      name: '',
      unit: '',
      quantity: 0,
      unitPrice: 0,
      creativeGeorgiaAmount: 0,
      selfFunding: 0,
      otherFunding: 0,
      lastEditedField: null,
      autoCalculatedField: 'otherFunding'
    }]
  },
  
  // Agreements
  agreements: savedForm?.agreements || {
    logoPlacement: false,
    personalData: false,
    fundingTerms: false,
    declaration: false
  },
  
  // Signature
  signature: savedForm?.signature || false
})

// Save form data to localStorage whenever it changes
watch(form, (newForm) => {
  // Remove tracking properties before saving to localStorage
  const formToSave = {
    ...newForm,
    expenseCategories: Object.keys(newForm.expenseCategories).reduce((acc: any, category: string) => {
      acc[category] = newForm.expenseCategories[category].map((expense: any) => {
        const { lastEditedField, autoCalculatedField, ...rest } = expense
        return rest
      })
      return acc
    }, {})
  }
  localStorage.setItem('applicationFormData', JSON.stringify(formToSave))
}, { deep: true })

// Budget auto-calculation
const totalBudgetCalculated = computed(() => {
  const requested = Number(form.requestedFromCreativeGeorgia) || 0
  const selfFunding = Number(form.selfFundingGel) || 0
  const coFunding = Number(form.coFundingGel) || 0
  
  return requested + selfFunding + coFunding
})

// Update totalBudgetGel whenever calculated value changes
watch(totalBudgetCalculated, (newTotal) => {
  form.totalBudgetGel = newTotal
})

// Expense totals calculations
const expenseTotalCreativeGeorgia = computed(() => {
  let total = 0
  Object.keys(form.expenseCategories).forEach((category: string) => {
    form.expenseCategories[category].forEach((expense: any) => {
      total += Number(expense.creativeGeorgiaAmount) || 0
    })
  })
  return total
})

const expenseTotalSelfFunding = computed(() => {
  let total = 0
  Object.keys(form.expenseCategories).forEach((category: string) => {
    form.expenseCategories[category].forEach((expense: any) => {
      total += Number(expense.selfFunding) || 0
    })
  })
  return total
})

const expenseTotalOtherFunding = computed(() => {
  let total = 0
  Object.keys(form.expenseCategories).forEach((category: string) => {
    form.expenseCategories[category].forEach((expense: any) => {
      total += Number(expense.otherFunding) || 0
    })
  })
  return total
})

const expenseGrandTotal = computed(() => {
  let total = 0
  Object.keys(form.expenseCategories).forEach((category: string) => {
    form.expenseCategories[category].forEach((expense: any) => {
      total += (Number(expense.quantity) || 0) * (Number(expense.unitPrice) || 0)
    })
  })
  return total
})

// Validate if expense total matches budget from Step 2
const budgetMismatch = computed(() => {
  const totalBudget = Number(form.totalBudgetGel) || 0
  const expenseTotal = expenseGrandTotal.value
  
  // Allow small difference due to rounding (0.01 GEL)
  const difference = Math.abs(totalBudget - expenseTotal)
  
  return {
    hasMismatch: difference > 0.01 && totalBudget > 0,
    totalBudget: totalBudget,
    expenseTotal: expenseTotal,
    difference: difference
  }
})

// Budget validation (no longer needed as it's auto-calculated)
const budgetError = computed(() => {
  return ''
})

// Word count helper
const wordCount = (text: string) => {
  if (!text) return 0
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

// Input restriction helpers
const restrictToEmailChars = (fieldName: string, event: Event, index: number = -1) => {
  const input = event.target as HTMLInputElement
  const value = input.value
  
  // Remove Georgian characters (Unicode range 10A0-10FF) and spaces
  // Also ensuring only standard characters are allowed (optional, but user asked for 'what mail allows')
  // For now, primarily stripping Georgian and spaces as requested
  const sanitized = value.replace(/[\u10A0-\u10FF\s]/g, '')
  
  // Update input value if changes were made
  if (value !== sanitized) {
    input.value = sanitized
  }
  
  // Update model
  if (fieldName === 'cofunders' && index >= 0) {
    form.cofunders[index].email = sanitized
  } else {
    // @ts-ignore
    form[fieldName] = sanitized
  }
}

// Add/Remove Stages
const addStage = () => {
  form.stages.push({ name: '', assignee: '', startDate: '', endDate: '', location: '' })
}

const removeStage = (index: number) => {
  if (form.stages.length > 1) {
    form.stages.splice(index, 1)
  }
}

// Add/Remove Expenses
const addExpenseToCategory = (category: string) => {
  form.expenseCategories[category].push({
    name: '',
    unit: '',
    quantity: 0,
    unitPrice: 0,
    creativeGeorgiaAmount: 0,
    selfFunding: 0,
    otherFunding: 0,
    lastEditedField: null,
    autoCalculatedField: 'otherFunding'
  })
}

const removeExpenseFromCategory = (category: string, index: number) => {
  if (form.expenseCategories[category].length > 1) {
    form.expenseCategories[category].splice(index, 1)
  }
}

// Calculate funding fields automatically
const calculateFunding = (expense: any, editedField: string) => {
  const total = (expense.quantity || 0) * (expense.unitPrice || 0)
  
  // If quantity or unitPrice changed, automatically set creativeGeorgiaAmount to total
  // User can still manually edit it afterwards
  if (editedField === 'quantity' || editedField === 'unitPrice') {
    expense.creativeGeorgiaAmount = total
    expense.selfFunding = 0
    expense.otherFunding = 0
    expense.autoCalculatedField = 'creativeGeorgia'
    expense.lastEditedField = 'creativeGeorgia'
    
    // If total is 0, we're done
    if (total === 0) {
      return
    }
  }
  
  // If total is 0 and we're not handling quantity/unitPrice, return early
  if (total === 0) {
    return
  }
  
  // Track which field was last edited
  if (editedField !== 'quantity' && editedField !== 'unitPrice') {
    expense.lastEditedField = editedField
  }
  
  // Get current values
  const creativeGeorgiaAmount = parseFloat(expense.creativeGeorgiaAmount) || 0
  let selfFunding = parseFloat(expense.selfFunding) || 0
  let otherFunding = parseFloat(expense.otherFunding) || 0
  
  // Priority: When selfFunding or otherFunding is edited, validate constraint
  // When creativeGeorgia is edited, calculate the other field (selfFunding or otherFunding)
  if (editedField === 'selfFunding') {
    // User edited Self Funding
    // Validate: selfFunding + otherFunding cannot exceed creativeGeorgiaAmount
    // If it exceeds, cap selfFunding
    if (creativeGeorgiaAmount > 0 && selfFunding + otherFunding > creativeGeorgiaAmount) {
      selfFunding = Math.max(0, creativeGeorgiaAmount - otherFunding)
      expense.selfFunding = selfFunding
    }
    
    // Recalculate Creative Georgia Amount: total - selfFunding - otherFunding
    // This ensures the equation: total = creativeGeorgiaAmount + selfFunding + otherFunding
    expense.autoCalculatedField = 'creativeGeorgia'
    expense.creativeGeorgiaAmount = Math.max(0, total - selfFunding - otherFunding)
  } else if (editedField === 'otherFunding') {
    // User edited Other Funding
    // Validate: selfFunding + otherFunding cannot exceed creativeGeorgiaAmount
    // If it exceeds, cap otherFunding
    if (creativeGeorgiaAmount > 0 && selfFunding + otherFunding > creativeGeorgiaAmount) {
      otherFunding = Math.max(0, creativeGeorgiaAmount - selfFunding)
      expense.otherFunding = otherFunding
    }
    
    // Recalculate Creative Georgia Amount: total - selfFunding - otherFunding
    // This ensures the equation: total = creativeGeorgiaAmount + selfFunding + otherFunding
    expense.autoCalculatedField = 'creativeGeorgia'
    expense.creativeGeorgiaAmount = Math.max(0, total - selfFunding - otherFunding)
  } else if (editedField === 'creativeGeorgia') {
    // User manually edited Creative Georgia
    // Validate: selfFunding + otherFunding cannot exceed the new creativeGeorgiaAmount
    const sum = selfFunding + otherFunding
    if (sum > creativeGeorgiaAmount) {
      // If sum exceeds, adjust the field that was NOT last edited
      if (expense.lastEditedField === 'otherFunding') {
        // Adjust Self Funding
        selfFunding = Math.max(0, creativeGeorgiaAmount - otherFunding)
        expense.selfFunding = selfFunding
        expense.autoCalculatedField = 'selfFunding'
      } else {
        // Default: adjust Other Funding
        otherFunding = Math.max(0, creativeGeorgiaAmount - selfFunding)
        expense.otherFunding = otherFunding
        expense.autoCalculatedField = 'otherFunding'
      }
    } else {
      // Calculate the field that was NOT last edited (default to otherFunding)
      if (expense.lastEditedField === 'otherFunding') {
        // Calculate Self Funding
        expense.autoCalculatedField = 'selfFunding'
        expense.selfFunding = Math.max(0, total - creativeGeorgiaAmount - otherFunding)
      } else {
        // Default: calculate Other Funding
        expense.autoCalculatedField = 'otherFunding'
        expense.otherFunding = Math.max(0, total - creativeGeorgiaAmount - selfFunding)
      }
    }
  } else if (editedField === 'quantity' || editedField === 'unitPrice') {
    // Quantity or price changed - creativeGeorgiaAmount is already set to total above
    // Validate: selfFunding + otherFunding cannot exceed the new total
    const sum = selfFunding + otherFunding
    if (sum > total) {
      // If sum exceeds total, adjust both proportionally or cap them
      if (selfFunding > 0 && otherFunding > 0) {
        // Adjust proportionally
        const ratio = total / sum
        selfFunding = selfFunding * ratio
        otherFunding = otherFunding * ratio
      } else if (selfFunding > 0) {
        // Only selfFunding exists, cap it
        selfFunding = Math.min(selfFunding, total)
      } else if (otherFunding > 0) {
        // Only otherFunding exists, cap it
        otherFunding = Math.min(otherFunding, total)
      }
      expense.selfFunding = selfFunding
      expense.otherFunding = otherFunding
    }
  }
}

// Add/Remove Cofunders
const addCofunder = () => {
  form.cofunders.push({ name: '', idCode: '', head: '', address: '', phone: '', email: '' })
}

const removeCofunder = (index: number) => {
  if (form.cofunders.length > 1) {
    form.cofunders.splice(index, 1)
  }
}

const nextStep = () => {
  if (currentStep.value === 1) {
    router.push({ name: 'application-step-2' })
  } else if (currentStep.value === 2) {
    router.push({ name: 'application-step-3' })
  }
}

const prevStep = () => {
  if (currentStep.value === 3) {
    router.push({ name: 'application-step-2' })
  } else if (currentStep.value === 2) {
    router.push({ name: 'application-step-1' })
  } else {
    router.push({ name: 'home' })
  }
}

const handleSubmit = async () => {
  // Prevent duplicate submissions
  if (isSubmitting.value) {
    return
  }
  
  // Validate budget
  if (budgetError.value) {
    openModal(t('application.validationError'), t('application.budgetError'), 'warning')
    return
  }
  
  // Validate expense total matches budget
  if (budgetMismatch.value.hasMismatch) {
    openModal(t('application.validationError'), t('application.budgetMismatchMessage'), 'warning')
    return
  }
  
  // Validate all agreements are checked
  if (!form.agreements.logoPlacement || !form.agreements.personalData || 
      !form.agreements.fundingTerms || !form.agreements.declaration) {
    openModal(t('application.validationError'), t('application.allAgreementsRequired'), 'warning')
    return
  }
  
  // Validate signature
  if (!form.signature) {
    openModal(t('application.validationError'), t('application.signatureRequired'), 'warning')
    return
  }
  
  // Validate word counts
  if (wordCount(form.projectDescription) > 800) {
    openModal(t('application.validationError'), t('application.wordLimit800'), 'warning')
    return
  }
  
  if (wordCount(form.evaluationCriteria) > 100) {
    openModal(t('application.validationError'), t('application.wordLimit100'), 'warning')
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Prepare form data for submission
    const formData = {
      ...form,
      // Ensure all data is included
      applicantType: form.applicantType,
      applicationType: form.applicationType,
      title: form.title,
      requestedAmountGel: form.requestedAmountGel,
      startDate: form.startDate,
      endDate: form.endDate,
      totalBudgetGel: form.totalBudgetGel,
      requestedFromCreativeGeorgia: form.requestedFromCreativeGeorgia,
      selfFundingGel: form.selfFundingGel,
      coFundingGel: form.coFundingGel,
      expenseCategories: form.expenseCategories,
      stages: form.stages,
      agreements: form.agreements,
      signature: form.signature,
    }
    
    // Send to API
    const response = await api.post('/applications', formData)
    
    if (response.data.success) {
      // Clear localStorage after successful submission
      localStorage.removeItem('applicationFormData')
      
      // Show success message and redirect
      openModal(
        t('application.successTitle'),
        t('application.success'),
        'success',
        () => {
          showModal.value = false
          router.push({ name: 'home' })
        }
      )
    } else {
      throw new Error(response.data.message || 'Failed to submit application')
    }
  } catch (error: any) {
    console.error('Application submission error:', error)
    const errorMessage = error.response?.data?.message || error.message || t('application.error')
    openModal(t('application.errorTitle'), errorMessage, 'error')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .bg-white {
  transform: scale(0.9) translateY(-20px);
}

.modal-leave-to .bg-white {
  transform: scale(0.9) translateY(20px);
}
</style>


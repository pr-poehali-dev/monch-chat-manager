import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Index() {
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'auth' | 'info' | 'stats'>('onboarding');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [authStep, setAuthStep] = useState<'phone' | 'code'>('phone');

  const nextOnboardingStep = () => {
    if (onboardingStep < 2) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setCurrentScreen('auth');
    }
  };

  const handlePhoneSubmit = () => {
    if (phoneNumber.length >= 10) {
      setAuthStep('code');
    }
  };

  const handleCodeSubmit = () => {
    if (verificationCode.length === 6) {
      setCurrentScreen('info');
    }
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 1) return numbers;
    if (numbers.length <= 4) return `+${numbers.slice(0, 1)} (${numbers.slice(1)}`;
    if (numbers.length <= 7) return `+${numbers.slice(0, 1)} (${numbers.slice(1, 4)}) ${numbers.slice(4)}`;
    if (numbers.length <= 9) return `+${numbers.slice(0, 1)} (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7)}`;
    return `+${numbers.slice(0, 1)} (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const onboardingContent = [
    {
      emoji: '🥕',
      title: 'Добро пожаловать в Monch!',
      description: 'Чат-менеджер — это лучшая замена Ирису: более безопасная, молодежная и быстрая. Также у нас есть свои секретики!',
      buttonText: 'Далее'
    },
    {
      emoji: '👨‍💼',
      title: '',
      description: 'Monch создан для больших чатов и высокой нагрузки! Если в чате уже есть Ирис, Monch автоматически покинет его.',
      buttonText: 'Далее'
    },
    {
      emoji: '✅',
      title: '',
      description: 'Официальный и безопасный бот с большим функционалом! Можно даже назначить человека администратором в группе. При высокой активности бот включает режим «Мега Безопасность».',
      buttonText: 'Хорошо'
    }
  ];

  const currentOnboarding = onboardingContent[onboardingStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F97316] via-[#FB923C] to-[#F97316] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-9xl">🥕</div>
        <div className="absolute bottom-20 right-10 text-9xl">🥕</div>
        <div className="absolute top-1/2 left-1/4 text-7xl rotate-45">🥕</div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {currentScreen === 'onboarding' && (
          <div className="flex-1 flex items-center justify-center p-6 animate-fade-in">
            <div className="max-w-md w-full text-center space-y-8">
              <div className="text-9xl mb-8 animate-scale-in">{currentOnboarding.emoji}</div>
              
              {currentOnboarding.title && (
                <h1 className="text-4xl font-bold text-white mb-4">
                  {currentOnboarding.title}
                </h1>
              )}
              
              <p className="text-xl text-white/95 leading-relaxed px-4">
                {currentOnboarding.description}
              </p>

              <div className="flex justify-center gap-2 py-6">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === onboardingStep ? 'w-8 bg-white' : 'w-2 bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextOnboardingStep}
                size="lg"
                className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-semibold text-lg py-6 rounded-2xl shadow-2xl transition-all hover:scale-105"
              >
                {currentOnboarding.buttonText}
              </Button>
            </div>
          </div>
        )}

        {currentScreen === 'auth' && (
          <div className="flex-1 flex items-center justify-center p-6 animate-fade-in">
            <div className="max-w-md w-full space-y-8">
              <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-10 space-y-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                {authStep === 'phone' ? (
                  <>
                    <div className="text-center space-y-3">
                      <h2 className="text-3xl font-semibold text-gray-900">Вход</h2>
                      <p className="text-gray-500 text-base">Введите номер телефона для продолжения</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 pl-4">Номер телефона</label>
                        <Input
                          type="tel"
                          placeholder="+7 (___) ___-__-__"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                          className="h-14 rounded-2xl border-gray-200 bg-gray-50 text-lg px-4 focus:bg-white focus:border-[#0EA5E9] transition-all"
                        />
                      </div>

                      <Button
                        onClick={handlePhoneSubmit}
                        disabled={phoneNumber.length < 10}
                        className="w-full h-14 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-semibold text-lg rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        Продолжить
                      </Button>
                    </div>

                    <div className="text-center">
                      <p className="text-xs text-gray-400">
                        Нажимая "Продолжить", вы соглашаетесь с условиями использования
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center space-y-3">
                      <h2 className="text-3xl font-semibold text-gray-900">Код подтверждения</h2>
                      <p className="text-gray-500 text-base">Введите 6-значный код из SMS</p>
                      <p className="text-sm text-gray-400">{phoneNumber}</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Input
                          type="text"
                          placeholder="000000"
                          maxLength={6}
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                          className="h-14 rounded-2xl border-gray-200 bg-gray-50 text-center text-2xl font-semibold tracking-[0.5em] focus:bg-white focus:border-[#0EA5E9] transition-all"
                        />
                      </div>

                      <Button
                        onClick={handleCodeSubmit}
                        disabled={verificationCode.length !== 6}
                        className="w-full h-14 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-semibold text-lg rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        Войти
                      </Button>

                      <button
                        onClick={() => setAuthStep('phone')}
                        className="w-full text-[#0EA5E9] font-medium text-base hover:text-[#0284C7] transition-colors"
                      >
                        Изменить номер
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {currentScreen === 'info' && (
          <div className="flex-1 flex items-center justify-center p-6 animate-fade-in">
            <div className="max-w-md w-full space-y-8">
              <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-10 space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Нам доверяют:</h2>
                
                <div className="space-y-4 text-gray-700 text-base">
                  <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl">
                    <span className="text-2xl">✓</span>
                    <p>Каналы с галочками</p>
                  </div>
                  <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl">
                    <span className="text-2xl">✓</span>
                    <p>Чаты от 20 тысяч подписчиков</p>
                  </div>
                  <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl">
                    <span className="text-2xl">✓</span>
                    <p>Чаты с активностью 77 пользователей в секунду</p>
                  </div>
                </div>

                <div className="space-y-3 pt-6">
                  <Button
                    onClick={() => window.open('https://t.me/+RwBkFmZNRONmNDQx', '_blank')}
                    className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-semibold text-base h-14 rounded-2xl shadow-lg transition-all hover:scale-[1.02]"
                  >
                    Зайти в наш чат
                  </Button>
                  
                  <Button
                    onClick={() => window.open('https://t.me/Aggentov', '_blank')}
                    variant="outline"
                    className="w-full border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-base h-14 rounded-2xl shadow-sm transition-all hover:scale-[1.02]"
                  >
                    Сообщить об ошибке
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentScreen === 'stats' && (
          <div className="flex-1 flex items-center justify-center p-6 animate-fade-in">
            <div className="max-w-md w-full space-y-8">
              <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-10 space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Статистика</h2>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                    <p className="text-gray-600 text-sm mb-2">Проведено судов на данный момент (все чаты):</p>
                    <p className="text-4xl font-bold text-gray-900">396 суда</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                    <p className="text-gray-600 text-sm mb-2">Число чатов, где я нахожусь (всего):</p>
                    <p className="text-4xl font-bold text-gray-900">1 746 чата</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                    <p className="text-gray-600 text-sm mb-2">Число отправленных от меня сообщений в группы и ЛС (всего на 19 января 2026 года):</p>
                    <p className="text-4xl font-bold text-gray-900">186 382</p>
                  </div>
                </div>

                <Button
                  onClick={() => window.open('https://t.me/Monchchatbot?startgroup=true&admin=change_info+delete_messages+restrict_members+invite_users+pin_messages+manage_chat', '_blank')}
                  className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-semibold text-base h-14 rounded-2xl shadow-lg mt-6 transition-all hover:scale-[1.02]"
                >
                  Добавить меня в чат
                </Button>
              </div>
            </div>
          </div>
        )}

        {currentScreen !== 'onboarding' && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20">
            <div className="relative bg-white/15 backdrop-blur-2xl rounded-[2rem] p-1.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] border border-white/30">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-[2rem]" />
              <div className="relative flex gap-2">
                <button
                  onClick={() => setCurrentScreen('info')}
                  className={`relative px-8 py-3.5 rounded-[1.75rem] font-semibold transition-all duration-300 ${
                    currentScreen === 'info'
                      ? 'bg-white text-[#F97316] shadow-[0_4px_20px_rgba(255,255,255,0.4)]'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Информация
                </button>
                <button
                  onClick={() => setCurrentScreen('stats')}
                  className={`relative px-8 py-3.5 rounded-[1.75rem] font-semibold transition-all duration-300 ${
                    currentScreen === 'stats'
                      ? 'bg-white text-[#F97316] shadow-[0_4px_20px_rgba(255,255,255,0.4)]'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Статистика
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
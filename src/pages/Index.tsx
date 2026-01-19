import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Index() {
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'info' | 'stats'>('onboarding');

  const nextOnboardingStep = () => {
    if (onboardingStep < 2) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setCurrentScreen('info');
    }
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

        {currentScreen === 'info' && (
          <div className="flex-1 flex items-center justify-center p-6 animate-fade-in">
            <div className="max-w-md w-full space-y-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 space-y-6 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-6">Нам доверяют:</h2>
                
                <div className="space-y-4 text-white/95 text-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <p>Каналы с галочками</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <p>Чаты от 20 тысяч подписчиков</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <p>Чаты с активностью 77 пользователей в секунду</p>
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <Button
                    onClick={() => window.open('https://t.me/+RwBkFmZNRONmNDQx', '_blank')}
                    className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-semibold text-lg py-6 rounded-2xl shadow-lg"
                  >
                    Зайти в наш чат
                  </Button>
                  
                  <Button
                    onClick={() => window.open('https://t.me/Aggentov', '_blank')}
                    className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-semibold text-lg py-6 rounded-2xl shadow-lg"
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
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 space-y-6 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-6">Статистика</h2>
                
                <div className="space-y-6">
                  <div className="bg-white/10 rounded-2xl p-6">
                    <p className="text-white/80 text-sm mb-2">Проведено свдв на данный момент (все чаты):</p>
                    <p className="text-4xl font-bold text-white">396 суда</p>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-6">
                    <p className="text-white/80 text-sm mb-2">Число чатов, где я нахожусь (всего):</p>
                    <p className="text-4xl font-bold text-white">1 746 чата</p>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-6">
                    <p className="text-white/80 text-sm mb-2">Число отправленных от меня сообщений в группы и ЛС (всего на 19 января 2026 года):</p>
                    <p className="text-4xl font-bold text-white">186 382</p>
                  </div>
                </div>

                <Button
                  onClick={() => window.open('https://t.me/Monchchatbot?startgroup=true&admin=change_info+delete_messages+restrict_members+invite_users+pin_messages+manage_chat', '_blank')}
                  className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-semibold text-lg py-6 rounded-2xl shadow-lg mt-6"
                >
                  Добавить меня в чат
                </Button>
              </div>
            </div>
          </div>
        )}

        {currentScreen !== 'onboarding' && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-white/20 backdrop-blur-xl rounded-full p-2 flex gap-2 shadow-2xl border border-white/20">
              <button
                onClick={() => setCurrentScreen('info')}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  currentScreen === 'info'
                    ? 'bg-white text-[#F97316] shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Информация
              </button>
              <button
                onClick={() => setCurrentScreen('stats')}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  currentScreen === 'stats'
                    ? 'bg-white text-[#F97316] shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Статистика
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

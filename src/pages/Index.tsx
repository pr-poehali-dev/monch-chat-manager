import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Update {
  id: string;
  title: string;
  time: string;
  content: string;
}

export default function Index() {
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'info' | 'stats' | 'updates'>('onboarding');
  const [updates, setUpdates] = useState<Update[]>([
    {
      id: '1',
      title: 'Добро пожаловать!',
      time: '19.01.2026',
      content: 'Мы рады представить вам обновленный Monch! **Теперь с новыми возможностями** и улучшенной производительностью.'
    }
  ]);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [newUpdate, setNewUpdate] = useState({ title: '', time: '', content: '' });
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const nextOnboardingStep = () => {
    if (onboardingStep < 2) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setCurrentScreen('info');
    }
  };

  const handleAdminAccess = () => {
    if (adminCode === 'AdminPanel2026AP') {
      setShowAdminPanel(true);
      setAdminCode('');
    }
  };

  const handleAddUpdate = () => {
    if (newUpdate.title && newUpdate.time && newUpdate.content) {
      setUpdates([{ id: Date.now().toString(), ...newUpdate }, ...updates]);
      setNewUpdate({ title: '', time: '', content: '' });
      setShowAdminPanel(false);
    }
  };

  const handleTextSelection = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value.substring(start, end);

    if (text) {
      setSelectedText(text);
      const rect = textarea.getBoundingClientRect();
      setSelectionPosition({ x: rect.left + 100, y: rect.top - 50 });
    } else {
      setSelectedText('');
    }
  };

  const applyFormatting = (type: 'bold' | 'quote') => {
    const textarea = textareaRef.current;
    if (!textarea || !selectedText) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(end);

    let formattedText = '';
    if (type === 'bold') {
      formattedText = `**${selectedText}**`;
    } else if (type === 'quote') {
      formattedText = `[${selectedText}]`;
    }

    const newContent = beforeText + formattedText + afterText;
    setNewUpdate({ ...newUpdate, content: newContent });
    setSelectedText('');
  };

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      } else if (part.startsWith('[') && part.endsWith(']')) {
        return (
          <span key={index} className="inline-block border-l-4 border-blue-400 bg-blue-50 px-3 py-1 my-1 rounded-r-lg text-blue-900">
            {part.slice(1, -1)}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
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

        {currentScreen === 'updates' && (
          <div className="flex-1 p-6 animate-fade-in overflow-y-auto pb-32">
            <div className="max-w-md w-full mx-auto space-y-6">
              <h2 className="text-3xl font-semibold text-white mb-6">Обновления</h2>
              
              {updates.map((update) => (
                <div key={update.id} className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-6 shadow-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{update.title}</h3>
                    <span className="text-sm text-gray-500">{update.time}</span>
                  </div>
                  <div className="text-gray-700 leading-relaxed">
                    {renderFormattedText(update.content)}
                  </div>
                </div>
              ))}

              <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Админ-панель</h3>
                
                {!showAdminPanel ? (
                  <div className="space-y-3">
                    <Input
                      type="password"
                      placeholder="Введите код доступа"
                      value={adminCode}
                      onChange={(e) => setAdminCode(e.target.value)}
                      className="h-12 rounded-xl border-gray-200 bg-gray-50"
                    />
                    <Button
                      onClick={handleAdminAccess}
                      className="w-full h-12 bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-xl"
                    >
                      Войти
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Название обновления</label>
                      <Input
                        placeholder="Новая функция"
                        value={newUpdate.title}
                        onChange={(e) => setNewUpdate({ ...newUpdate, title: e.target.value })}
                        className="h-12 rounded-xl border-gray-200 bg-gray-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Время обновления</label>
                      <Input
                        placeholder="19.01.2026"
                        value={newUpdate.time}
                        onChange={(e) => setNewUpdate({ ...newUpdate, time: e.target.value })}
                        className="h-12 rounded-xl border-gray-200 bg-gray-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Текст обновления</label>
                      <div className="relative">
                        <Textarea
                          ref={textareaRef}
                          placeholder="Описание обновления..."
                          value={newUpdate.content}
                          onChange={(e) => setNewUpdate({ ...newUpdate, content: e.target.value })}
                          onSelect={handleTextSelection}
                          className="min-h-32 rounded-xl border-gray-200 bg-gray-50 resize-none"
                        />
                        
                        {selectedText && (
                          <div
                            className="fixed bg-white shadow-2xl rounded-xl p-2 flex gap-2 border border-gray-200 z-50"
                            style={{ top: selectionPosition.y, left: selectionPosition.x }}
                          >
                            <button
                              onClick={() => applyFormatting('quote')}
                              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all"
                            >
                              C
                            </button>
                            <button
                              onClick={() => applyFormatting('bold')}
                              className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-semibold transition-all"
                            >
                              J
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        onClick={handleAddUpdate}
                        className="flex-1 h-12 bg-green-500 hover:bg-green-600 text-white rounded-xl"
                      >
                        Добавить
                      </Button>
                      <Button
                        onClick={() => setShowAdminPanel(false)}
                        variant="outline"
                        className="flex-1 h-12 border-2 border-gray-200 rounded-xl"
                      >
                        Отмена
                      </Button>
                    </div>
                  </div>
                )}
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
                  className={`relative px-6 py-3.5 rounded-[1.75rem] font-semibold transition-all duration-300 ${
                    currentScreen === 'info'
                      ? 'bg-white text-[#F97316] shadow-[0_4px_20px_rgba(255,255,255,0.4)]'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Информация
                </button>
                <button
                  onClick={() => setCurrentScreen('stats')}
                  className={`relative px-6 py-3.5 rounded-[1.75rem] font-semibold transition-all duration-300 ${
                    currentScreen === 'stats'
                      ? 'bg-white text-[#F97316] shadow-[0_4px_20px_rgba(255,255,255,0.4)]'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Статистика
                </button>
                <button
                  onClick={() => setCurrentScreen('updates')}
                  className={`relative px-6 py-3.5 rounded-[1.75rem] font-semibold transition-all duration-300 ${
                    currentScreen === 'updates'
                      ? 'bg-white text-[#F97316] shadow-[0_4px_20px_rgba(255,255,255,0.4)]'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Обновления
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
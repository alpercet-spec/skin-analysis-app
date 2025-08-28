import React, { useState } from 'react';
import { Camera, ChevronRight, Star, Check, Upload, Award, Target, Zap, Heart } from 'lucide-react';
import Image from 'next/image';

interface Answers {
  [key: string]: string | string[];
}

const SkinAnalysisApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState([0, 0, 0]);

  const questions = [
    {
      id: 'age',
      title: 'Yaşınız?',
      type: 'radio',
      options: [
        { value: '18-25', label: '📸 18-25' },
        { value: '26-35', label: '📸 26-35' },
        { value: '36-45', label: '📸 36-45' },
        { value: '46-55', label: '📸 46-55' },
        { value: '55+', label: '📸 55+' }
      ]
    },
    {
      id: 'gender',
      title: 'Cinsiyetiniz?',
      type: 'radio',
      options: [
        { value: 'female', label: '👩 Kadın' },
        { value: 'male', label: '👨 Erkek' }
      ]
    },
    {
      id: 'skinType',
      title: 'Cilt tipinizi nasıl tanımlarsınız?',
      type: 'radio',
      options: [
        { value: 'dry', label: '🜏️ Kuru — Cildim sık sık gergin hissediliyor, pul pul dökülme veya çatlama oluyor.' },
        { value: 'oily', label: '💧 Yağlı — Cildim gün içinde parlaklaşıyor, özellikle alın, burun ve çenemde yağlanma oluyor, gözeneklerim belirgin.' },
        { value: 'combination', label: '🌓 Karma — T bölgem (alın, burun, çene) yağlanıyor ama yanaklarım daha kuru veya normal.' },
        { value: 'sensitive', label: '🌸 Hassas — Cildim kolayca kızarıyor, tahriş oluyor ya da ürünlere hızlı tepki veriyor.' },
        { value: 'normal', label: '✨ Normal — Ne aşırı yağlanma ne de kuruluk hissediyorum, genel olarak dengeli ve rahat.' }
      ]
    },
    {
      id: 'concerns',
      title: 'En çok hangi cilt sorunlarını yaşıyorsunuz?',
      type: 'checkbox',
      options: [
        { value: 'acne', label: '🔴 Sık sık sivilce ya da akne çıkıyor' },
        { value: 'wrinkles', label: '⛛ Kırışıklıklarım var, yaşlanma belirtileri belirginleşiyor' },
        { value: 'dark_spots', label: '☀️ Cildimde lekeler ve renk düzensizlikleri var' },
        { value: 'dryness', label: '🜏️ Cildim kuruyor, gerginlik hissediyorum' },
        { value: 'pores', label: '🔍 Gözeneklerim geniş ve belirgin görünüyor' },
        { value: 'dullness', label: '😴 Cildim mat, yeterince canlı ve parlak değil' },
        { value: 'redness', label: '🌹 Cildim kolayca kızarıyor ve hassas' },
        { value: 'blackheads', label: '⚫ Siyah noktalarım var' },
        { value: 'uneven_texture', label: '🏔️ Cilt dokum pürüzlü, yeterince pürüzsüz değil' },
        { value: 'under_eye', label: '👁️ Göz altlarımda morluk ve torbalanma var' }
      ]
    },
    {
      id: 'skinTone',
      title: 'Cilt tonunuz hangisine daha yakın?',
      type: 'radio',
      options: [
        { value: 'very_light', label: '🤍 Cildim çok açık, güneşte hemen kızarırım.' },
        { value: 'light', label: '🏻 Cildim açık, bazen yanarım ama hafif de bronzlaşırım.' },
        { value: 'medium_light', label: '🏼 Cildim buğday, önce biraz kızarırım sonra bronzlaşırım.' },
        { value: 'medium', label: '🏽 Cildim esmer, kolayca bronzlaşırım, nadiren yanarım.' },
        { value: 'medium_dark', label: '🏾 Cildim koyuya yakın, hemen bronzlaşırım, yanmam.' },
        { value: 'dark', label: '🏿 Cildim koyu tenli, güneş yanığı hiç olmuyor.' }
      ]
    },
    {
      id: 'allergies',
      title: 'Bilinen cilt alerjileriniz var mı?',
      type: 'checkbox',
      options: [
        { value: 'fragrance', label: '🌺 Parfüm ve koku' },
        { value: 'alcohol', label: '🷂 Alkol içeren ürünler' },
        { value: 'salicylic_acid', label: '💊 Salisilik asit' },
        { value: 'retinol', label: '🧴 Retinol/Retinoid' },
        { value: 'aha_bha', label: '🧪 AHA/BHA asitler' },
        { value: 'parabens', label: '🧫 Paraben' },
        { value: 'sulfates', label: '🧼 Sülfat' },
        { value: 'dyes', label: '🎨 Boyar maddeler' },
        { value: 'none', label: '✅ Hiçbiri yok' }
      ]
    },
    {
      id: 'routine',
      title: 'Şu anda hangi ürünleri düzenli olarak kullanıyorsunuz?',
      type: 'checkbox',
      options: [
        { value: 'cleanser', label: '🧼 Temizleyici' },
        { value: 'toner', label: '💧 Tonik' },
        { value: 'moisturizer', label: '🧴 Nemlendirici' },
        { value: 'sunscreen', label: '☀️ Güneş kremi' },
        { value: 'serum', label: '💎 Serum' },
        { value: 'eye_cream', label: '👁️ Göz kremi' },
        { value: 'face_oil', label: '💧 Yüz yağı' },
        { value: 'exfoliator', label: '🧽 Peeling/Scrub' },
        { value: 'mask', label: '🎭 Yüz maskesi' },
        { value: 'spot_treatment', label: '🎯 Leke tedavi ürünü' },
        { value: 'none', label: '❌ Hiçbir şey kullanmıyorum' }
      ]
    },
    {
      id: 'frequency',
      title: 'Evde ne sıklıkla cilt bakımı yapıyorsunuz?',
      type: 'radio',
      options: [
        { value: 'twice_daily', label: '🌅🌙 Günde 2 kez (sabah-akşam)' },
        { value: 'once_daily', label: '🌙 Günde 1 kez (genelde akşam)' },
        { value: 'few_times_week', label: '📅 Haftada birkaç kez' },
        { value: 'weekly', label: '📆 Haftada 1 kez' },
        { value: 'rarely', label: '🤷‍♀️ Çok nadir' },
        { value: 'never', label: '❌ Hiç yapmıyorum' }
      ]
    },
    {
      id: 'lifestyle',
      title: 'Yaşam tarzınız nasıl?',
      type: 'checkbox',
      options: [
        { value: 'active_outdoor', label: '🏃‍♀️ Çok aktif, dışarıda zaman geçiriyorum' },
        { value: 'office_indoor', label: '💼 Çoğunlukla ofiste/iç mekan' },
        { value: 'smoker', label: '🚬 Sigara içiyorum' },
        { value: 'stressed', label: '😰 Stresli bir dönemdeyim' },
        { value: 'good_sleep', label: '😴 Düzenli uyku alıyorum' },
        { value: 'poor_sleep', label: '😵‍💫 Uyku düzenim bozuk' },
        { value: 'healthy_diet', label: '🥗 Sağlıklı besleniyorum' },
        { value: 'lots_water', label: '💧 Çok su içiyorum' },
        { value: 'little_water', label: '🚱 Çok az su içiyorum' }
      ]
    },
    {
      id: 'climate',
      title: 'Yaşadığınız yerin iklimi nasıl?',
      type: 'radio',
      options: [
        { value: 'dry_hot', label: '🌵 Kuru ve sıcak' },
        { value: 'humid_hot', label: '🏖️ Nemli ve sıcak' },
        { value: 'moderate', label: '🌤️ Ilıman' },
        { value: 'cold_dry', label: '❄️ Soğuk ve kuru' },
        { value: 'cold_humid', label: '🌧️ Soğuk ve nemli' },
        { value: 'varies', label: '🌈 Mevsimsel olarak değişiyor' }
      ]
    },
    {
      id: 'makeup',
      title: 'Makyaj kullanım sıklığınız?',
      type: 'radio',
      options: [
        { value: 'daily', label: '💄 Her gün makyaj yapıyorum' },
        { value: 'work_days', label: '👔 Sadece iş günleri' },
        { value: 'special_occasions', label: '🎉 Özel günlerde' },
        { value: 'rarely', label: '🤷‍♀️ Çok nadir' },
        { value: 'never', label: '❌ Hiç kullanmıyorum' }
      ]
    },
    {
      id: 'previous_treatments',
      title: 'Daha önce hangi tedavileri denediniz?',
      type: 'checkbox',
      options: [
        { value: 'botox', label: '💉 Botoks' },
        { value: 'filler', label: '💊 Dolgu' },
        { value: 'mesotherapy', label: '🧬 Mezoterapiler' },
        { value: 'bbl', label: '🌟 BBL tedavileri' },
        { value: 'collagen', label: '🧪 Kolajen aşıları' },
        { value: 'radiofrequency', label: '📡 Radyofrekans tedavileri' },
        { value: 'skin_laser', label: '⚡ Cilt lazer tedavileri' },
        { value: 'professional_care', label: '✨ Profesyonel cilt bakımı' },
        { value: 'chemical_peel', label: '🧪 Kimyasal peeling' },
        { value: 'acne_medication', label: '💊 Akne ilaçları' },
        { value: 'home_devices', label: '🏠 Evde kullanım cihazları' },
        { value: 'prescription_creams', label: '📋 Reçeteli kremler' },
        { value: 'none', label: '❌ Hiçbirini denemedim' }
      ]
    },
    {
      id: 'goals',
      title: 'Cilt bakım ve tedavilerinden beklentiniz nedir?',
      type: 'checkbox',
      options: [
        { value: 'clear_acne', label: '🎯 Akne/sivilcelerden kurtulmak' },
        { value: 'anti_aging', label: '⏰ Yaşlanma karşıtı bakım' },
        { value: 'even_tone', label: '🌟 Cilt tonunu eşitlemek' },
        { value: 'hydration', label: '💧 Nem dengesini sağlamak' },
        { value: 'reduce_pores', label: '🔍 Gözenekleri küçültmek' },
        { value: 'brighten', label: '✨ Cilt parlaklığını artırmak' },
        { value: 'sensitive_care', label: '🌸 Hassas cilt bakımı' },
        { value: 'maintenance', label: '🛡️ Mevcut durumu korumak' },
        { value: 'natural_glow', label: '🌅 Doğal bir parlaklık' }
      ]
    },
    {
      id: 'timeline',
      title: 'Ne kadar sürede sonuç görmek istiyorsunuz?',
      type: 'radio',
      options: [
        { value: '2_weeks', label: '⚡ 2 hafta içinde' },
        { value: '1_month', label: '📅 1 ay içinde' },
        { value: '3_months', label: '🗓️ 3 ay içinde' },
        { value: '6_months', label: '📆 6 ay içinde' },
        { value: 'patient', label: '🧘‍♀️ Sabırlıyım, kalıcı sonuç istiyorum' }
      ]
    },
    {
      id: 'budget',
      title: 'Evde cilt bakımı ürünleri için ayırdığınız aylık bütçe nedir?',
      type: 'radio',
      options: [
        { value: '0-1000', label: '💰 0-1000 TL' },
        { value: '1000-2500', label: '💰💰 1000-2500 TL' },
        { value: '2500-5000', label: '💰💰💰 2500-5000 TL' },
        { value: '5000+', label: '💰💰💰💰 5000+ TL' }
      ]
    },
    {
      id: 'health_factors',
      title: 'Cilt sağlığınızı etkileyebilecek faktörler var mı?',
      type: 'checkbox',
      options: [
        { value: 'hormone_treatment', label: '🩺 Hormon tedavisi alıyorum' },
        { value: 'antibiotics', label: '💊 Antibiyotik kullanıyorum' },
        { value: 'corticosteroids', label: '💉 Kortikosteroid (prednizon vb.) kullanıyorum' },
        { value: 'acne_treatment', label: '🩹 Akne tedavisi görüyorum' },
        { value: 'blood_thinners', label: '🩸 Kan sulandırıcı kullanıyorum' },
        { value: 'thyroid_meds', label: '🦋 Tiroid ilaçlarım var' },
        { value: 'antidepressants', label: '🧠 Antidepresan kullanıyorum' },
        { value: 'none_health', label: '❌ Yukarıdakilerin hiçbiri' }
      ]
    },
    {
      id: 'hormonal_changes',
      title: 'Hormonal değişiklikler cilt görünümünü etkiliyor mu?',
      type: 'checkbox',
      options: [
        { value: 'irregular_period', label: '🩸 Düzensiz regl döngüm var' },
        { value: 'pregnancy', label: '🤰 Hamilelik/emzirme dönemindeyim' },
        { value: 'menopause', label: '🌸 Menopoz dönemindeyim' },
        { value: 'no_hormonal_changes', label: '🆗 Hormonal değişiklikler fark etmiyorum' },
        { value: 'prefer_not_answer_hormonal', label: '🤐 Bu soruyu cevaplamak istemiyorum' }
      ]
    },
    {
      id: 'past_problems',
      title: 'Geçmiş te cilt ile ilgili sorun yaşadınız mı?',
      type: 'checkbox',
      options: [
        { value: 'chronic_irritation', label: '🔥 Kronik kaşıntı/kızarıklık problemi' },
        { value: 'dryness_problem', label: '🜏️ Pullanma ve kuruluk sorunu' },
        { value: 'recurring_sensitivity', label: '⚠️ Sürekli tekrarlayan cilt hassasiyeti' },
        { value: 'no_serious_problems', label: '✅ Ciddi bir cilt sorunu yaşamadım' },
        { value: 'prefer_not_answer_past', label: '🤐 Bu soruyu cevaplamak istemiyorum' }
      ]
    }
  ];

  const generateAnalysisResults = () => {
    const skinType = answers.skinType as string;
    const concerns = answers.concerns as string[] || [];
    const age = answers.age as string;

    // Cilt tipine göre öneriler
    const recommendations = {
      dry: {
        priority: 'Nemlendirme',
        products: ['Hyaluronik Asit Serum', 'Yoğun Nemlendirici Krem', 'Yumuşak Temizleyici'],
        routine: 'Sabah ve akşam nazik temizlik, bol nemlendirme'
      },
      oily: {
        priority: 'Yağ Kontrolü',
        products: ['Niacinamide Serum', 'Salisilik Asit Temizleyici', 'Hafif Nemlendirici'],
        routine: 'Günde 2 kez temizlik, yağ kontrolü ürünleri'
      },
      combination: {
        priority: 'Denge Sağlama',
        products: ['Dengeleyici Tonik', 'Hafif Serum', 'Bölgesel Bakım'],
        routine: 'T bölge için yağ kontrolü, yanaklar için nemlendirme'
      },
      sensitive: {
        priority: 'Hassasiyet Azaltma',
        products: ['Hassas Cilt Temizleyicisi', 'Aloe Vera Jeli', 'Mineral SPF'],
        routine: 'Az ürün, nazik uygulama, güçlü aktiflerden kaçının'
      },
      normal: {
        priority: 'Koruma',
        products: ['C Vitamini Serum', 'Günlük Nemlendirici', 'Güneş Kremi'],
        routine: 'Temel bakım rutini, korunmaya odaklanma'
      }
    };

    const currentRec = recommendations[skinType as keyof typeof recommendations] || recommendations.normal;

    return {
      skinScore: Math.floor(Math.random() * 20) + 70, // 70-90 arası
      hydrationLevel: Math.floor(Math.random() * 30) + (skinType === 'dry' ? 40 : 60),
      skinAge: age === '18-25' ? Math.floor(Math.random() * 3) + 18 : 
               age === '26-35' ? Math.floor(Math.random() * 5) + 25 :
               Math.floor(Math.random() * 10) + 35,
      concerns: concerns.length,
      priority: currentRec.priority,
      recommendations: currentRec.products,
      routine: currentRec.routine
    };
  };

  const handleAnswer = (questionId: string, value: string) => {
    if (questions[currentStep].type === 'checkbox') {
      const currentAnswers = (answers[questionId] as string[]) || [];
      if (value === 'none') {
        setAnswers({ ...answers, [questionId]: ['none'] });
      } else if (currentAnswers.includes('none')) {
        setAnswers({ ...answers, [questionId]: [value] });
      } else if (currentAnswers.includes(value)) {
        setAnswers({ ...answers, [questionId]: currentAnswers.filter((a: string) => a !== value) });
      } else {
        setAnswers({ ...answers, [questionId]: [...currentAnswers, value] });
      }
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length + 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setCurrentAnalysisStep(0);
    setAnalysisProgress([0, 0, 0]);

    // İlk progress bar - Cildinizi keşfediyoruz (5 saniye)
    for (let i = 0; i <= 100; i += 2) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setAnalysisProgress([i, 0, 0]);
    }
    setCurrentAnalysisStep(1);

    // İkinci progress bar - Günlük bakımlarınızı güçlendiriyoruz (5 saniye)  
    for (let i = 0; i <= 100; i += 2) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setAnalysisProgress([100, i, 0]);
    }
    setCurrentAnalysisStep(2);

    // Üçüncü progress bar - Size özel bakım ve tedavi planları hazırlıyoruz (5 saniye)
    for (let i = 0; i <= 100; i += 2) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setAnalysisProgress([100, 100, i]);
    }

    setIsAnalyzing(false);
    setCurrentStep(currentStep + 1);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const canProceed = () => {
    if (currentStep >= questions.length) return true;
    const currentQuestion = questions[currentStep];
    const currentAnswer = answers[currentQuestion.id];
    return currentAnswer && (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : true);
  };

  // Premium ekranı
  if (currentStep === questions.length + 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Star className="w-10 h-10 text-white fill-current" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Premium Cilt Analizi</h2>
            <p className="text-gray-600">AI destekli detaylı analiz ve kişisel bakım planı</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span className="font-semibold">Detaylı Cilt Analizi</span>
              </div>
              <p className="text-sm text-gray-600">AI teknolojisi ile 20+ parametre analizi</p>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span className="font-semibold">Kişisel Bakım Planı</span>
              </div>
              <p className="text-sm text-gray-600">Size özel ürün önerileri ve rutin</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-3xl font-bold text-gray-800 mb-1">
              ₺29,99 <span className="text-lg text-gray-500 line-through">₺99,99</span>
            </div>
            <p className="text-sm text-green-600 font-semibold">%70 İndirim - Sınırlı Süre!</p>
          </div>

          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 mb-4">
            Premium&apos;a Başla
          </button>

          <button 
            onClick={() => setCurrentStep(0)}
            className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            Baştan Başla
          </button>
        </div>
      </div>
    );
  }

  // Analiz sonuçları ekranı
  if (currentStep === questions.length + 2) {
    const results = generateAnalysisResults();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Analiz Tamamlandı!</h2>
            <p className="text-gray-600">İşte cilt analizi sonuçlarınız</p>
          </div>

          <div className="space-y-4 mb-8">
            {/* Cilt Skoru */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-500" />
                  Cilt Skoru
                </span>
                <span className="text-2xl font-bold text-green-600">{results.skinScore}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                  style={{ width: `${results.skinScore}%` }}
                ></div>
              </div>
            </div>

            {/* Nem Seviyesi */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-blue-500" />
                  Nem Seviyesi
                </span>
                <span className="text-lg font-bold text-blue-600">%{results.hydrationLevel}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full"
                  style={{ width: `${results.hydrationLevel}%` }}
                ></div>
              </div>
            </div>

            {/* Öncelik Alanı */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <Heart className="w-5 h-5 mr-2 text-purple-500" />
                <span className="font-semibold">Öncelik Alanı</span>
              </div>
              <p className="text-purple-700 font-medium">{results.priority}</p>
            </div>

            {/* Önerilen Ürünler */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl">
              <h3 className="font-semibold text-orange-800 mb-2">🛒 Önerilen Ürünler:</h3>
              <ul className="space-y-1">
                {results.recommendations.map((product, index) => (
                  <li key={index} className="text-sm text-orange-700">
                    • {product}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bakım Rutini */}
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-4 rounded-xl">
              <h3 className="font-semibold text-teal-800 mb-2">📅 Önerilen Rutin:</h3>
              <p className="text-sm text-teal-700">{results.routine}</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Premium Rapor Al
            </button>
            
            <button
              onClick={() => setCurrentStep(0)}
              className="w-full bg-gray-100 text-gray-600 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Yeni Analiz Yap
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fotoğraf yükleme ekranı
  if (currentStep === questions.length + 1) {
    if (isAnalyzing) {
      const analysisSteps = [
        { text: 'Cildinizi keşfediyoruz', icon: '🔍', color: 'from-pink-400 to-purple-500' },
        { text: 'Günlük bakımlarınızı güçlendiriyoruz', icon: '💪', color: 'from-blue-400 to-cyan-500' },
        { text: 'Size özel bakım ve tedavi planları hazırlıyoruz', icon: '✨', color: 'from-green-400 to-emerald-500' }
      ];

      return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4 flex items-center justify-center">
          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
              <Camera className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Analiz Ediliyor...</h2>
            <p className="text-gray-600 mb-8">AI modelimiz fotoğrafınızı inceliyor</p>
            
            <div className="space-y-6 mb-6">
              {analysisSteps.map((step, index) => (
                <div key={index} className="text-left">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{step.icon}</span>
                    <span className={`font-semibold text-sm ${
                      currentAnalysisStep >= index ? 'text-gray-800' : 'text-gray-400'
                    }`}>
                      {step.text}
                    </span>
                    {currentAnalysisStep > index && (
                      <Check className="w-5 h-5 text-green-500 ml-auto" />
                    )}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`bg-gradient-to-r ${step.color} h-3 rounded-full transition-all duration-300 ${
                        currentAnalysisStep === index ? 'animate-pulse' : ''
                      }`}
                      style={{ width: `${analysisProgress[index]}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-sm text-gray-500">
              Bu işlem yaklaşık 15 saniye sürecek...
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Cilt Fotoğrafınızı Yükleyin</h2>
            <p className="text-gray-600">AI analizimiz için temiz, doğal ışıkta çekilmiş bir fotoğraf paylaşın</p>
          </div>

          <div className="mb-8">
            {uploadedPhoto ? (
              <div className="relative">
                <Image
                  src={uploadedPhoto}
                  alt="Yüklenen fotoğraf"
                  width={500}
                  height={256}
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
                <button
                  onClick={() => setUploadedPhoto(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ) : (
              <label className="block">
                <div className="border-2 border-dashed border-pink-300 rounded-2xl p-8 text-center cursor-pointer hover:border-pink-400 transition-colors">
                  <Upload className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                  <p className="text-pink-600 font-semibold mb-2">Fotoğraf Yükle</p>
                  <p className="text-sm text-gray-500">JPG, PNG desteklenir</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-xl mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">💡 En İyi Sonuç İçin:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Doğal ışık kullanın</li>
              <li>• Makyajsız olun</li>
              <li>• Yüzünüz tam görünsün</li>
              <li>• Net ve odaklanmış olsun</li>
            </ul>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!uploadedPhoto}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-200 ${
              uploadedPhoto
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-xl hover:-translate-y-1'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Analizi Başlat
          </button>
        </div>
      </div>
    );
  }

  // Özet ekranı
  if (currentStep === questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🎉</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Harika!</h2>
            <p className="text-gray-600">Bilgileriniz kaydedildi. Son adım olarak cilt fotoğrafınızı yükleyin.</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-green-50 p-4 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-2">✅ Cevaplarınız Kaydedildi</h3>
              <div className="text-sm text-green-700">
                <p>• Yaş: {answers.age as string || 'Belirtilmedi'}</p>
                {answers.gender && <p>• Cinsiyet: {questions[1].options.find(o => o.value === answers.gender)?.label || 'Belirtilmedi'}</p>}
                {answers.skinType && <p>• Cilt Tipi: {questions[2].options.find(o => o.value === answers.skinType)?.label.split(' — ')[0] || 'Belirtilmedi'}</p>}
                <p>• Bütçe: {answers.budget as string || 'Belirtilmedi'} TL</p>
                <p>• Toplam {Object.keys(answers).length} soru yanıtlandı</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Fotoğraf Yüklemeye Geç
          </button>
        </div>
      </div>
    );
  }

  // Anket soruları
  const currentQuestion = questions[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Adım {currentStep + 1}/{questions.length}</span>
            <span className="text-sm text-gray-500">{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentQuestion.title}</h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = currentQuestion.type === 'checkbox' 
                ? ((answers[currentQuestion.id] as string[]) || []).includes(option.value)
                : answers[currentQuestion.id] === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-pink-400 bg-pink-50'
                      : 'border-gray-200 hover:border-pink-300 hover:bg-pink-25'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={isSelected ? 'text-pink-700 font-medium' : 'text-gray-700'}>
                      {option.label}
                    </span>
                    {isSelected && (
                      <div className="w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-200 ${
            canProceed()
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-xl hover:-translate-y-1'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <div className="flex items-center justify-center">
            Devam Et
            <ChevronRight className="ml-2 w-5 h-5" />
          </div>
        </button>

        {/* Privacy Note */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Verileriniz güvenle korunur ve sadece analiz için kullanılır.
        </p>
      </div>
    </div>
  );
};

export default SkinAnalysisApp;

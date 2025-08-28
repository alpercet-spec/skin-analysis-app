import React, { useState } from 'react';
import { Camera, ChevronRight, Star, Check, Upload } from 'lucide-react';
import Image from 'next/image';

interface Answers {
  [key: string]: string | string[];
}

const SkinAnalysisApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  const questions = [
    {
      id: 'age',
      title: 'Yaşınız kaç?',
      type: 'radio',
      options: [
        { value: '18-25', label: '18-25' },
        { value: '26-35', label: '26-35' },
        { value: '36-45', label: '36-45' },
        { value: '46-55', label: '46-55' },
        { value: '55+', label: '55+' }
      ]
    },
    {
      id: 'gender',
      title: 'Cinsiyetiniz nedir?',
      type: 'radio',
      options: [
        { value: 'female', label: '👩 Kadın' },
        { value: 'male', label: '👨 Erkek' },
        { value: 'other', label: '⚥ Diğer' },
        { value: 'prefer_not_to_say', label: '🤐 Belirtmek istemiyorum' }
      ]
    },
    {
      id: 'skinType',
      title: 'Cilt tipinizi nasıl tanımlarsınız?',
      type: 'radio',
      options: [
        { value: 'dry', label: '🏜️ Kuru - Cildin gergin hissettiği, pullanma olduğu' },
        { value: 'oily', label: '💧 Yağlı - Parlayan, gözeneklerin açık olduğu' },
        { value: 'combination', label: '🌓 Karma - T bölgede yağlı, yanaklarda kuru' },
        { value: 'sensitive', label: '🌸 Hassas - Kolay kızaran, tahriş olan' },
        { value: 'normal', label: '✨ Normal - Dengeli, sorunsuz' }
      ]
    },
    {
      id: 'concerns',
      title: 'En çok hangi cilt sorununuz var?',
      type: 'checkbox',
      options: [
        { value: 'acne', label: '🔴 Akne ve sivilce' },
        { value: 'wrinkles', label: '⌛ Kırışıklık ve yaşlanma belirtileri' },
        { value: 'dark_spots', label: '☀️ Leke ve renk eşitsizliği' },
        { value: 'dryness', label: '🏜️ Kuruluk ve sıkılık' },
        { value: 'pores', label: '🔍 Büyük gözenekler' },
        { value: 'dullness', label: '😴 Cansızlık ve parlaklık eksikliği' },
        { value: 'redness', label: '🌹 Kızarıklık ve hassasiyet' },
        { value: 'blackheads', label: '⚫ Siyah nokta ve komedo' },
        { value: 'uneven_texture', label: '🏔️ Pürüzlü doku' },
        { value: 'under_eye', label: '👁️ Göz altı torba ve morluk' }
      ]
    },
    {
      id: 'skinTone',
      title: 'Cilt tonunuz hangisi?',
      type: 'radio',
      options: [
        { value: 'very_light', label: '🤍 Çok açık - Kolayca güneş yanığı oluyor' },
        { value: 'light', label: '🏻 Açık - Bazen güneş yanığı oluyor' },
        { value: 'medium_light', label: '🏼 Orta açık - Hafif bronzlaşıyor' },
        { value: 'medium', label: '🏽 Orta - Kolay bronzlaşıyor' },
        { value: 'medium_dark', label: '🏾 Orta koyu - Çok kolay bronzlaşıyor' },
        { value: 'dark', label: '🏿 Koyu - Hiç güneş yanığı olmuyor' }
      ]
    },
    {
      id: 'allergies',
      title: 'Bilinen cilt alerjileriniz var mı?',
      type: 'checkbox',
      options: [
        { value: 'fragrance', label: '🌺 Parfüm ve koku' },
        { value: 'alcohol', label: '🍷 Alkol içeren ürünler' },
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
      title: 'Şu anda hangi ürünleri kullanıyorsunuz?',
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
      title: 'Ne sıklıkla cilt bakımı yapıyorsunuz?',
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
        { value: 'lots_water', label: '💧 Çok su içiyorum' }
      ]
    },
    {
      id: 'climate',
      title: 'Yaşadığınız yerin iklimi nasıl?',
      type: 'radio',
      options: [
        { value: 'dry_hot', label: '🌵 Kuru ve sıcak' },
        { value: 'humid_hot', label: '🏝️ Nemli ve sıcak' },
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
        { value: 'daily', label: '💄 Her gün kullanıyorum' },
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
        { value: 'dermatologist', label: '👨‍⚕️ Dermatolog muayenesi' },
        { value: 'chemical_peel', label: '🧪 Kimyasal peeling' },
        { value: 'microdermabrasion', label: '💎 Mikrodermaabrazyon' },
        { value: 'laser_treatment', label: '⚡ Lazer tedavisi' },
        { value: 'acne_medication', label: '💊 Akne ilaçları' },
        { value: 'facial_treatments', label: '✨ Profesyonel yüz bakımları' },
        { value: 'home_devices', label: '🏠 Evde kullanım cihazları' },
        { value: 'prescription_creams', label: '📝 Reçeteli kremler' },
        { value: 'none', label: '❌ Hiçbirini denemedim' }
      ]
    },
    {
      id: 'goals',
      title: 'Cilt bakımından beklentiniz nedir?',
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
      title: 'Aylık cilt bakım bütçeniz ne kadar?',
      type: 'radio',
      options: [
        { value: '0-250', label: '💰 0-250 TL' },
        { value: '250-500', label: '💰💰 250-500 TL' },
        { value: '500-1000', label: '💰💰💰 500-1000 TL' },
        { value: '1000+', label: '💰💰💰💰 1000+ TL' }
      ]
    }
  ];

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
    if (currentStep < questions.length + 1) {
      setCurrentStep(currentStep + 1);
    }
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

  if (currentStep === questions.length + 2) {
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

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span className="font-semibold">Uzman Desteği</span>
              </div>
              <p className="text-sm text-gray-600">7/24 dermatolog danışmanlığı</p>
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

          <p className="text-xs text-gray-500">
            İstediğiniz zaman iptal edebilirsiniz. İlk 7 gün ücretsiz deneme.
          </p>
        </div>
      </div>
    );
  }

  if (currentStep === questions.length + 1) {
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
                  width={400}
                  height={256}
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
                <button
                  onClick={() => setUploadedPhoto(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
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
            onClick={handleNext}
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

  if (currentStep === questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🎉</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Harika!</h2>
            <p className="text-gray-600">Analiziniz hazır. Son adım olarak cilt fotoğrafınızı yükleyin.</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-green-50 p-4 rounded-xl">
              <h3 className="font-semibold text-green-800 mb-2">✅ Cevaplarınız Kaydedildi</h3>
              <div className="text-sm text-green-700">
                <p>• Yaş: {answers.age as string || 'Belirtilmedi'}</p>
                {answers.gender && <p>• Cinsiyet: {questions[1].options.find(o => o.value === answers.gender)?.label || 'Belirtilmedi'}</p>}
                {answers.skinType && <p>• Cilt Tipi: {questions[2].options.find(o => o.value === answers.skinType)?.label.split(' - ')[0] || 'Belirtilmedi'}</p>}
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
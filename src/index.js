// Імпорт стилів
import './styles/main.css';
import './styles/fonts.css';

// Імпортуємо lodash для демонстрації оптимізації зовнішніх бібліотек
import _ from 'lodash';

// Замість використання реального зображення, оскільки у нас є проблема з завантаженням,
// ми створимо його програмно
// import webpackLogo from './assets/images/webpack-logo.png';

document.addEventListener('DOMContentLoaded', () => {
  // Додаємо прослуховувач для запуску додаткових анімацій при прокрутці
  setupScrollAnimations();
  
  // Функція для генерації випадкового числа
  const generateRandomNumber = () => {
    const randomResult = _.random(1, 100);
    const resultElement = document.getElementById('random-result');
    
    // Очищаємо поточне значення
    resultElement.textContent = '';
    
    // Додаємо клас для анімації
    resultElement.classList.add('animate-active');
    
    // Анімація появи числа (поступова заміна символами)
    let currentValue = '';
    const finalValue = randomResult.toString();
    const duration = 20; // тривалість між кожним символом в мс
    
    for (let i = 0; i < finalValue.length; i++) {
      setTimeout(() => {
        currentValue += finalValue[i];
        resultElement.textContent = currentValue;
        
        // Додаємо додаткову анімацію для останнього символу
        if (i === finalValue.length - 1) {
          resultElement.classList.add('animate-complete');
          setTimeout(() => {
            resultElement.classList.remove('animate-complete');
          }, 500);
        }
      }, duration * i);
    }
    
    return randomResult;
  };
  
  // Генеруємо початкове число
  generateRandomNumber();
  
  // Додаємо обробник події для кнопки
  const generateButton = document.getElementById('generate-new');
  if (generateButton) {
    generateButton.addEventListener('click', (e) => {
      // Додаємо ефект хвилі при натисканні
      createRippleEffect(e);
      
      // Генеруємо нове число
      generateRandomNumber();
      
      // Ефект натискання
      generateButton.classList.add('button-pressed');
      setTimeout(() => {
        generateButton.classList.remove('button-pressed');
      }, 200);
    });
  }
  
  // Функція для створення ефекту хвилі при натисканні кнопки
  function createRippleEffect(event) {
    const button = event.currentTarget;
    
    // Створюємо елемент для ефекту хвилі
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    // Позиціонуємо елемент відносно курсора
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    
    // Видаляємо попередні ефекти
    const ripple = button.querySelector('.ripple');
    if (ripple) {
      ripple.remove();
    }
    
    // Додаємо елемент до кнопки
    button.appendChild(circle);
    
    // Видаляємо елемент після анімації
    setTimeout(() => {
      circle.remove();
    }, 600);
  }
  
  // Функція для анімацій при прокрутці
  function setupScrollAnimations() {
    // Додаємо класи для анімації при прокрутці
    const animateOnScroll = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          observer.unobserve(entry.target);
        }
      });
    };
    
    // Налаштовуємо спостерігач
    const observer = new IntersectionObserver(animateOnScroll, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px'
    });
    
    // Додаємо класи для всіх елементів з анімацією
    document.querySelectorAll('.content, .library-demo, .image-block').forEach(item => {
      observer.observe(item);
    });
  }
  
  // Замість використання завантаженого зображення, створимо заглушку
  const logoImg = document.querySelector('.logo');
  if (logoImg) {
    // logoImg.src = webpackLogo;
    
    // Створюємо canvas для відображення заглушки в стилі Apple
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    
    const ctx = canvas.getContext('2d');
    
    // Створюємо градієнт фону
    const gradient = ctx.createLinearGradient(0, 0, 200, 200);
    gradient.addColorStop(0, '#42d392');
    gradient.addColorStop(1, '#647eff');
    
    // Малюємо заокруглений прямокутник
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(0, 0, 200, 200, 30);
    ctx.fill();
    
    // Малюємо логотип Webpack
    ctx.fillStyle = gradient;
    ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Webpack', 100, 100);
    
    // Додаємо тінь
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;
    
    // Замінюємо зображення на canvas
    const parent = logoImg.parentNode;
    parent.replaceChild(canvas, logoImg);
    canvas.className = 'logo';
    
    // Додаємо обробник для анімації при наведенні
    canvas.addEventListener('mouseover', () => {
      animateLogo(canvas, ctx, gradient);
    });
  }
  
  // Функція для анімації логотипу при наведенні
  function animateLogo(canvas, ctx, gradient) {
    let angle = 0;
    let scale = 1;
    let direction = 1;
    
    const animate = () => {
      // Очищаємо canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Оновлюємо параметри анімації
      angle += 0.02 * direction;
      scale += 0.003 * direction;
      
      if (scale > 1.05) direction = -1;
      if (scale < 0.95) direction = 1;
      
      // Зберігаємо поточний стан
      ctx.save();
      
      // Трансформуємо canvas
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angle * Math.PI / 180);
      ctx.scale(scale, scale);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      
      // Малюємо заокруглений прямокутник
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(0, 0, 200, 200, 30);
      ctx.fill();
      
      // Оновлюємо градієнт
      const updatedGradient = ctx.createLinearGradient(0, 0, 200, 200);
      updatedGradient.addColorStop(0, `hsl(${150 + angle * 5}, 60%, 54%)`);
      updatedGradient.addColorStop(1, `hsl(${230 + angle * 5}, 100%, 70%)`);
      
      // Малюємо логотип
      ctx.fillStyle = updatedGradient;
      ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Webpack', 100, 100);
      
      // Додаємо тінь
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 10;
      
      // Відновлюємо попередній стан
      ctx.restore();
      
      // Продовжуємо анімацію
      if (Math.abs(angle) < 5) {
        requestAnimationFrame(animate);
      }
    };
    
    // Запускаємо анімацію
    animate();
  }
  
  console.log('Webpack успішно налаштований!');
  
  // Додаємо анімацію для градієнта
  const gradient = document.querySelector('.gradient-bg');
  if (gradient) {
    const animateGradient = () => {
      gradient.style.opacity = '0.7';
      setTimeout(() => {
        gradient.style.opacity = '1';
        setTimeout(animateGradient, 2000);
      }, 2000);
    };
    
    // Запускаємо анімацію
    animateGradient();
  }
  
  // Додаємо обробники для всіх кнопок
  document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Створюємо ефект світіння в напрямку курсора
      button.style.background = `radial-gradient(circle at ${x}px ${y}px, #0077ED, #0071e3 50%)`;
    });
    
    button.addEventListener('mouseleave', () => {
      // Повертаємо звичайний колір
      button.style.background = '';
    });
  });
}); 
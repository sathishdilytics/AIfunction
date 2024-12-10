const options = document.querySelectorAll('.option');
    const submitBtn = document.querySelector('.submit-btn');
    const talkBtn = document.querySelector('.talk-btn');
    const goBackBtn = document.querySelector('.go-back-btn');
    const percentageDisplay = document.querySelector('.percentage');
    const progressBar = document.querySelector('.progress');

    let selectedOptions = 0;
    const totalOptions = options.length;

    options.forEach(option => {
      option.addEventListener('click', () => {
        const circle = option.querySelector('.circle');
        
        if (circle.classList.contains('selected')) {
          circle.classList.remove('selected');
          selectedOptions--;
        } else {
          circle.classList.add('selected');
          selectedOptions++;
        }
      });
    });

    submitBtn.addEventListener('click', () => {
      if (selectedOptions > 0) {
        const percentage = Math.round((selectedOptions / totalOptions) * 100);
        
        document.getElementById('first-page').style.display = 'none';
        document.getElementById('second-page').style.display = 'block';
        
        animatePercentage(percentage);
        animateProgressBar(percentage);
      }
    });

    function animatePercentage(targetPercentage) {
      let currentPercentage = 0;
      const duration = 1000; // 1 second
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        currentPercentage = Math.round(progress * targetPercentage);
        percentageDisplay.textContent = `${currentPercentage}%`;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    }

    function getDynamicText(percentage) {
  const texts = {
    20: "You've selected a great starting point, and we're covering 20% of what you're looking for. Let us help you complete the rest with our tailored solutions.",
    40: "Your initial selections show promise. We've addressed 40% of your data analytics needs. Let's explore how we can further optimize your strategy.",
    60: "We're making significant progress! Our solutions now cover 60% of your requirements. We're committed to comprehensive support.",
    80: "You're on the right track! Our solutions now encompass 80% of your data analytics strategy. Just a few more steps to complete optimization.",
    100: "Congratulations! We've comprehensively addressed 100% of your data analytics needs with our tailored AI solutions."
  };

  return texts[percentage] || texts[20];
}

// Modify the submit event listener
submitBtn.addEventListener('click', () => {
  if (selectedOptions > 0) {
    const percentage = Math.round((selectedOptions / totalOptions) * 100);
    
    document.getElementById('first-page').style.display = 'none';
    document.getElementById('second-page').style.display = 'block';
    
    animatePercentage(percentage);
    animateProgressBar(percentage);
    
    // Update dynamic text
    document.querySelector('.dynamic-text').textContent = getDynamicText(percentage);
  }
});

    function animateProgressBar(targetPercentage) {
      progressBar.style.width = `${targetPercentage}%`;
    }

    goBackBtn.addEventListener('click', () => {
      document.getElementById('second-page').style.display = 'none';
      document.getElementById('first-page').style.display = 'block';
      
      // Reset selections
      options.forEach(option => {
        option.querySelector('.circle').classList.remove('selected');
      });
      selectedOptions = 0;
    });
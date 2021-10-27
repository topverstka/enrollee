document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector('body')

    function removeAll(items, itemClass) {
        if (typeof items == 'string') {
            items = document.querySelectorAll(items)
        }
        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            item.classList.remove(itemClass)
        }
    }

    menuToggle()
    function menuToggle() {
        const burger = document.querySelector('.burger')
        const menu = document.querySelector('.menu')

        burger.addEventListener('click', () => {
            burger.classList.toggle('_active')
            menu.classList.toggle('_show')
            body.classList.toggle('_lock')
        })
    }

    const mainSlider = new Swiper('.main-slider', {

        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        // autoplay: {
        //     delay: 5000,
        // },

        breakpoints: {
            1200: {

            },
            700: {

            },
            620: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            540: {
                slidesPerView: 1,
                spaceBetween: 0,
            }
        }
    });

    const popularSlider = new Swiper('.popular__slider', {

        slidesPerView: 1.5,
        spaceBetween: 10,
        loop: true,
        centeredSlides: true,

        breakpoints: {
            450: {
                slidesPerView: 2,
                centeredSlides: true,
            },
            670: {
                slidesPerView: 3,
            },
            900: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            },
        },

        navigation: {
            nextEl: '.popular__slider-arrow_next',
            prevEl: '.popular__slider-arrow_prev',
        },
    });

    const worksSlider1 = new Swiper('.works-slider_1', {
        slidesPerView: 1.5,
        spaceBetween: 16,
        observer: true,
        observeParents: true,

        breakpoints: {
            500: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            900: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 26,
            },
        },

        pagination: {
            el: '.works-slider__pagination_1',
            clickable: true,
        },
    });

    const worksSlider2 = new Swiper('.works-slider_2', {
        slidesPerView: 1.5,
        spaceBetween: 16,
        observer: true,
        observeParents: true,

        breakpoints: {
            500: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            900: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 26,
            },
        },

        pagination: {
            el: '.works-slider__pagination_2',
            clickable: true,
        },
    });

    const studentsSlider = new Swiper('.students-section-slider', {

        slidesPerView: 1.5,
        spaceBetween: 32,
        loop: true,
        speed: 5000,
        autoplay: {
            delay: 0,
        },

        breakpoints: {
            450: {
                slidesPerView: 2,
                centeredSlides: true,
            },
            670: {
                slidesPerView: 3,
            },
            900: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });

    const univerSlider = new Swiper('.univers__slider', {

        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,

        pagination: {
            el: '.univers__slider-pagination',
            clickable: true,
        }
    });

    // При скролле создается дубликат шапки, который фиксируется и плавно показывается при скролле
    showDuplicateHeader()
    function showDuplicateHeader() {
        // Создание дубликата
        const header = document.querySelector('.header')
        const wrapper = document.querySelector('.wrapper')
        let headerDuplicate = document.createElement('div')

        headerDuplicate.innerHTML = header.innerHTML
        headerDuplicate.classList.add('header', '_fixed')

        wrapper.prepend(headerDuplicate)

        // Показ шапки при скролле
        headerDuplicate = document.querySelector('.header._fixed')
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 200) {
                if (!headerDuplicate.classList.contains('_show')) {
                    headerDuplicate.classList.add('_show')
                }
            }
            else {
                headerDuplicate.classList.remove('_show')
            }
        })
    }

    accordion()
    function accordion() {
        const accHeaderElems = document.querySelectorAll('.accordion__header')
        const accBodyElems = document.querySelectorAll('.accordion__body')

        for (let i = 0; i < accBodyElems.length; i++) {
            const accBody = accBodyElems[i];
            accBody.style.maxHeight = 0
        }

        for (let i = 0; i < accHeaderElems.length; i++) {
            const accHeader = accHeaderElems[i];
            accHeader.addEventListener('click', () => {
                const accParent = accHeader.parentElement
                const accBody = accHeader.nextElementSibling

                accHeader.classList.toggle('_show')

                if (accHeader.classList.contains('_show')) {
                    accBody.style.maxHeight = 'none'
                } else {
                    accBody.style.maxHeight = 0
                }
            })
        }
    }

    if (document.querySelector('.filter__more_mobile')) { filterAccordionMobile() }
    function filterAccordionMobile() {
        const btn = document.querySelector('.filter__more_mobile')
        const filter = document.querySelector('.filter__body')

        btn.addEventListener('click', () => {
            btn.classList.toggle('filter_show')

            if (btn.classList.contains('filter_show')) {
                filter.style.maxHeight = filter.scrollHeight + 'px'
            } else {
                filter.style.maxHeight = 0
            }
        })
    }

    if (document.querySelector('.filter__more')) { filterAccordion() }
    function filterAccordion() {
        const btn = document.querySelector('.filter__more')
        const btnText = btn.querySelector('.filter__more-text')
        const selectElems = document.querySelectorAll('.filter__select')

        btn.addEventListener('click', () => {
            btn.classList.toggle('filter_show')

            for (let i = 7; i < selectElems.length; i++) {
                const select = selectElems[i];

                if (btn.classList.contains('filter_show')) {
                    select.style.display = 'block'
                } else {
                    select.style.display = 'none'
                }
            }

            if (btn.classList.contains('filter_show')) {
                btnText.innerHTML = 'Close'
            } else {
                btnText.innerText = 'More'
            }
        })
    }

    hiddenPaginationIfBulletAlone()
    function hiddenPaginationIfBulletAlone() {
        const sliderElems = document.querySelectorAll('.works-slider')
        for (let i = 0; i < sliderElems.length; i++) {
            const slider = sliderElems[i];
            const pagin = slider.nextElementSibling
            const bulletElems = pagin.querySelectorAll('.swiper-pagination-bullet')

            if (bulletElems.length > 1) {
                pagin.classList.add('_show')
            }
        }
    }

    tabs()
    function tabs() {
        const tabBtnElems = document.querySelectorAll('.tabs-btn')

        for (let i = 0; i < tabBtnElems.length; i++) {
            const tabBtn = tabBtnElems[i];
            tabBtn.addEventListener('click', () => {
                const tabData = tabBtn.dataset.tabsHeader
                const tabParent = tabBtn.closest('.tabs')
                const tabBody = tabParent.querySelector(`[data-tabs-body="${tabData}"]`)

                removeAll(tabParent.querySelectorAll('.tabs__body'), '_active')
                tabBody.classList.add('_active')

                removeAll(tabParent.querySelectorAll('.tabs-btn'), '_active')
                tabBtn.classList.add('_active')

                trackShowBullet = setInterval(() => {
                    if (tabBody.querySelector('.swiper-pagination')) {
                        hiddenPaginationIfBulletAlone()
                        clearInterval(trackShowBullet)
                    }
                }, 100)
            })
        }
    }

    setLike()
    function setLike() {
        const likeElems = document.querySelectorAll('.estim-like')
        for (let i = 0; i < likeElems.length; i++) {
            const like = likeElems[i];
            like.addEventListener('click', () => {
                like.classList.toggle('_full')
            })
        }
    }

    // Проверка качетства пароля. На данный момент сделана простая проверка по кол-ву символов
    newPass()
    function newPass() {
        const pass = document.querySelector('#new-pass')
        if (!pass) { return false }
        const passQuality = document.querySelector('#pass-quality')
        const conArray = [
            '_bad',
            '_good',
            '_perfect'
        ]

        pass.addEventListener('input', () => {
            const passValue = pass.value

            // Простая проверка пароля
            if (passValue.length == 0) {
                removeArrayClass(conArray)
            }

            if (passValue != 0 && passValue.length < 5) {
                removeArrayClass(conArray)
                passQuality.classList.add('_bad')
            }

            if (passValue.length >= 5 && passValue.length < 10) {
                removeArrayClass(conArray)
                passQuality.classList.add('_good')
            }

            if (passValue.length >= 10 && passValue.length < 15) {
                removeArrayClass(conArray)
                passQuality.classList.add('_perfect')
            }
        })

        function removeArrayClass(array) {
            for (let i = 0; i < array.length; i++) {
                passQuality.classList.remove(array[i])
            }
        }
    }

    checkSignupFormStep1()
    function checkSignupFormStep1() {
        const form = document.querySelector('#signup-form-step-1')

    }

    // Отправка формы первого шага регистрации пользователя
    signupFormStep1()
    function signupFormStep1() {
        const form = document.querySelector('#signup-form')
        if (!form) { return false }
        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            let validForm = true
            validForm = checkInputEmail(form)

            if (validForm === true) {
                formData = new FormData()
                const checkboxChecked = document.querySelector('.signup__checkbox-input[checked]').value
                formData.append('who', checkboxChecked)
                
                let response = await fetch('../handler.php', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    console.log(await response.text())
                }
                else {
                    console.log(await response.text())
                }
            }
        })
    }

    
    function checkInputEmail(form) {
        const input = form.querySelector('input[type="email"]')
        const value = input.value
        const parent = input.closest('.form__block')

        if (value.includes('@') == false) {
            parent.classList.add('_error')
            return false
        }
        else {
            parent.classList.remove('_error')
            return true
        }
    }

    signupLangMore()
    function signupLangMore() {
        const btnElems = document.querySelectorAll('.signup__checkbox-list-lang .signup__checkbox')
        if (btnElems.length == 0) { return false }
        const btnShow = document.querySelector('.signup__lang-more')
        let toggle = true

        btnShow.addEventListener('click', (e) => {
            e.preventDefault()
            for (let i = 5; i < btnElems.length; i++) {
                const btn = btnElems[i];
                if (toggle === true) {
                    btn.style.display = 'block'
                    btnShow.classList.add('_show')
                }
                if (toggle === false) {
                    btn.style.display = 'none'
                    btnShow.classList.remove('_show')
                }
            }
            
            if (toggle === true) {
                toggle = false
            }
            else if (toggle === false) {
                toggle = true
            }
        })
    }

    changeGoalAdvisor()
    function changeGoalAdvisor() {
        const btnElems = document.querySelectorAll('.advisor-content__block-change')
        const allCard = document.querySelectorAll('.advisor-message')
        for (let i = 0; i < btnElems.length; i++) {
            const btn = btnElems[i];
            btn.addEventListener('click', () => {
                const btnData = btn.dataset.advisorChange
                const cardElems = document.querySelectorAll(`[data-advisor-message="${btnData}"]`) 

                removeAll(allCard, '_show')                
                for (let i = 0; i < cardElems.length; i++) {
                    const card = cardElems[i];
                    card.classList.add('_show')
                }
            })
        }
    }
})

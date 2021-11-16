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

    // Изменение скролла у body
    function bodyLock(con) {
        if (con == true) {
            body.classList.add('_lock');
        } else if (con == false) {
            body.classList.remove('_lock');
        }
    }

    headerFixed()
    function headerFixed() {
        const header = document.querySelector('.header')
        const headerHeight = header.clientHeight
        let headerMain = false

        window.addEventListener('scroll', () => {

            if (header.classList.contains('header_page-main')) {
                headerMain = true
            }

            if (pageYOffset > 200) {
                header.classList.add('_fixed')
                body.style.paddingTop = headerHeight + 'px'
                if (headerMain == true) {
                    header.classList.remove('header_page-main')
                }
            }
            else {
                header.classList.remove('_fixed')
                body.style.paddingTop = 0
                if (headerMain == true) {
                    header.classList.add('header_page-main')
                }
            }
        })
    }

    menuToggle()
    function menuToggle() {
        const burgerElems = document.querySelectorAll('.burger')
        const menu = document.querySelector('.menu')
        const logoLight = document.querySelector('.logo__link_light')
        
        for (let i = 0; i < burgerElems.length; i++) {
            const burger = burgerElems[i];
            
            burger.addEventListener('click', () => {
                burger.classList.toggle('_active')
                menu.classList.toggle('_show')
                body.classList.toggle('_lock')

                if (logoLight) {
                    logoLight.classList.toggle('logo__link_light')
                }
            })
        }
    }

    // Слайдер на главном экране
    if (document.querySelector('.main-slider')) { mainSlider() }
    function mainSlider() {
        const track = document.querySelector('.main-slider-wrapper')
    
        startPositionOfElements()
        function startPositionOfElements() {
            const slideElems = track.querySelectorAll('.main-slide')
    
            for (let i = 0; i < slideElems.length; i++) {
    
                const slideCurrent = slideElems[0]
                const slideNext = slideCurrent.nextElementSibling
                const slidePrev = slideCurrent.previousElementSibling
    
                slideCurrent.classList.add('slide_current')
                if (slideNext) {
                    slideNext.classList.add('slide_next')
                }
                if (slidePrev) {
                    slidePrev.classList.add('slide_prev')
                }
            }
        }
    
        setInterval(() => {
            slide()
        }, 3000);

        function slide() {
            const slideCurrent = track.querySelector('.slide_current')
            const slidePrev = slideCurrent.previousElementSibling
            const slideNext = slideCurrent.nextElementSibling
            const timer = 500
            
            // Удаляем класс у предыдущего
            if (slidePrev) {
                slidePrev.classList.remove('slide_prev')
            }
            
            // Текущий слайд делаем предыдущим
            slideCurrent.classList.add('_active')
            setTimeout(() => {
                slideCurrent.classList.remove('_active')
                slideCurrent.classList.remove('slide_current')
                slideCurrent.classList.add('slide_prev')
            }, timer)
            
            // Следующий слайд делаем текущим
            slideNext.classList.add('_active')
            setTimeout(() => {
                slideNext.classList.remove('_active')
                slideNext.classList.remove('slide_next')
                slideNext.classList.add('slide_current')
            }, timer)
            
            // Второй следующий слайд делаем первым следующим
            slideNext.nextElementSibling.classList.add('_active-prev')
            setTimeout(() => {
                slideNext.nextElementSibling.classList.remove('_active-prev')
                slideNext.nextElementSibling.classList.add('slide_next')
            }, timer)
            
            infinitySlider()
        }
    
        function infinitySlider() {
            const slideElems = document.querySelectorAll('.main-slide')
            if (slideElems[2].classList.contains('slide_current')) {
                const slideDubl = document.createElement('div')
                slideDubl.classList.add('main-slide','slider-slide')
                slideDubl.innerHTML = slideElems[0].innerHTML
                
                track.append(slideDubl)
                slideElems[0].remove()
            }
        }
    }

    // Маска для ввода номера карты и даты
    if (document.querySelector('.new-card')) {
        maskForCard()
    }
    function maskForCard() {
        let cleaveNumCard = new Cleave('.new-card__num', {
            creditCard: true,
            onCreditCardTypeChanged: function (type) {
            }
        });  
        
        var cleaveDate = new Cleave('.new-card__date', {
            date: true,
            datePattern: ['m', 'y']
        });
    }

    const popularSlider = new Swiper('.popular__slider', {

        slidesPerView: 1.4,
        spaceBetween: 10,
        loop: true,
        centeredSlides: true,

        breakpoints: {
            345: {
                slidesPerView: 1.5,
                centeredSlides: true,
            },
            450: {
                slidesPerView: 2,
                centeredSlides: true,
            },
            670: {
                slidesPerView: 3,
                centeredSlides: true,
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

    const studentsSlider = new Swiper('.students-section-slider', {

        slidesPerView: 1.2,
        spaceBetween: 12, 
        centeredSlides: false,
        loop: true,
        speed: 5000,
        autoplay: {
            delay: 0,
        },

        breakpoints: {
            360: {
                slidesPerView: 1.5,
                spaceBetween: 16, 
            },
            450: {
                slidesPerView: 2,
            },
            670: {
                slidesPerView: 3,
                centeredSlides: true,
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

            if (validForm === true) {
                formData = new FormData()
                const checkboxChecked = document.querySelector('.signup__checkbox-input[checked]').value
                formData.append('who', checkboxChecked)
                
                let response = await fetch('#', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    console.log(await response.text())
                }
                else {
                    console.error('Error', await response.text())
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
                
                removeAll(btnElems, '_active')
                btn.classList.add('_active')

                removeAll(allCard, '_show')                
                for (let i = 0; i < cardElems.length; i++) {
                    const card = cardElems[i];
                    card.classList.add('_show')
                }
            })
        }
    }

    // Взаимосвязь между инпутом с ползунком и соседним инпутом с числами
    changeRangeInput()
    function changeRangeInput() {
        const rangeElems = document.querySelectorAll('input[type="range"]')

        for (let i = 0; i < rangeElems.length; i++) {
            const range = rangeElems[i];
            const numInput = range.nextElementSibling
            
            range.addEventListener('input', () => {
                numInput.value = range.value
            })
            
            numInput.addEventListener('input', () => {
                range.value = numInput.value
            })
        }
    }

    // Звездный рейтинг
    // В инпуте с классом star-rating-change__input содержится значение рейтинга
    starRating()
    function starRating() {
        const starContainerElems = document.querySelectorAll('.star-rating-change')

        for (let i = 0; i < starContainerElems.length; i++) {
            const starContainer = starContainerElems[i];
            const starElems = starContainer.querySelectorAll('span')
            const input = starContainer.querySelector('.star-rating-change__input')
            
            for (let i = 0; i < starElems.length; i++) {
                const star = starElems[i];
                
                star.addEventListener('click', () => {
                    removeAll(starElems, 'rating-card__star_full')
                    
                    for (let y = starElems.length - 1; y >= i; y--) {
                        const starSibling = starElems[y];
                        starSibling.classList.add('rating-card__star_full')
                    }

                    input.value = i+1
                })
            }
        }

        // Выставление начального звездного рейтинга по значению инпута
        // function starRatingInput(starElems, input) {
        //     let value = parseInt(input.value)
    
        //     for (let i = 0; i < starElems.length; i++) {
        //         const star = starElems[i];
    
        //         console.log(value)
        //         // for (let y = 0; y < value; y++) {
        //         for (let y = starElems.length - 1; y >= value; y--) {
        //             const starSibling = starElems[y];
        //             starSibling.classList.add('rating-card__star_full')
        //         }
        //     }
        // }
    }

    // Добавление своих тегов при регистрации
    if (document.querySelector('.add-tag__tag-list')) { addTags() }
    function addTags() {
        // Добавляем новые теги
        const btnAdd = document.querySelector('.add-tag__button')
        const textareaBlock = document.querySelector('.add-tag__textarea-block')
        const textarea = textareaBlock.querySelector('textarea')
        const tagsBlock = document.querySelector('.add-tag__tag-list')

        btnAdd.addEventListener('click', addTag)
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                addTag(e)
            }
        })

        function addTag(e) {
            e.preventDefault()
            if (!textarea.value == '') {
                const tagClasses = tagsBlock.querySelector('.add-tag__tag').getAttribute('class').split(' ')
                const tag = document.createElement('div')
                for (let tagClass of tagClasses) {
                    tag.classList.add(tagClass)
                }
                tag.innerHTML = `
                    <input class="signup-help__tag-input" type="checkbox" checked>
                    <span class="signup-help__tag-text">${textarea.value}</span>
                `
                tagsBlock.append(tag)
            }
            else {
                valueNotEmpty()
            }
        }

        // Поле не должно быть пустым
        function valueNotEmpty() {
            if (!document.querySelector('.signup-help__add-textarea-error')) {
                const textareaBlock = document.querySelector('.signup-help__add-textarea')
                const error = document.createElement('span')
                error.classList.add('signup-help__add-textarea-error')
                error.innerText = 'Поле не должно быть пустым'
    
                const addedError = textareaBlock.insertBefore(error, document.querySelector('.signup-help__add-textarea-btn').nextSibling)

                setTimeout(() => {
                    addedError.remove()
                }, 2000)
            }
        }
    }

    // Редактирование тегов в профиле студента
    // editTagsStudentProfile()
    if (document.querySelector('.student-profile-how__list')) { editTagsStudentProfile() }
    function editTagsStudentProfile() {
        // Добавляем новые теги
        const btnAdd = document.querySelector('.add-tag__button')
        const textareaBlock = document.querySelector('.add-tag__textarea-block')
        const textarea = textareaBlock.querySelector('textarea')
        const tagsBlock = document.querySelector('.student-profile-how__list')

        btnAdd.addEventListener('click', addTag)
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                addTag(e)
            }
        })

        function addTag(e) {
            e.preventDefault()
            if (!textarea.value == '') {
                const tagClasses = tagsBlock.querySelector('.student-about__list-item').getAttribute('class').split(' ')
                const tag = document.createElement('a')
                tag.setAttribute('href', '#')
                for (let tagClass of tagClasses) {
                    tag.classList.add(tagClass)
                }
                tag.innerHTML = textarea.value
                // tagsBlock.append(tag)
                tagsBlock.insertBefore(tag, tagsBlock.querySelector('.student-about__list-item-delete'))
            }
            else {
                valueNotEmpty()
            }
        }

        // Удаляем теги
        const btn = document.querySelector('.student-about__list-item-delete')
        
        tagsBlock.addEventListener('click', (e) => {
            const target = e.target
            
            if (target.classList.contains('student-about__list-item-delete')) {
                const tagElems = tagsBlock.querySelectorAll('.student-about__list-item')
                for (let i = 0; i < tagElems.length; i++) {
                    const tag = tagElems[i];
                    if (!tag.classList.contains('_tag-delete')) {
                        tag.classList.add('_tag-delete')
                        btn.classList.add('_active')
                        btn.innerText = 'Done'
                    }
                    else {
                        tag.classList.remove('_tag-delete')
                        btn.classList.remove('_active')
                        btn.innerText = 'Delete'
                    }
                }
            }
            
            if (target.classList.contains('student-about__list-item') && target.classList.contains('_tag-delete')) {
                e.preventDefault()
                target.remove()
            }
        })
    }

    // Мультиселект
    multiselect()
    function multiselect() {
        const multiselectElems = document.querySelectorAll('.multiselect')
        for (let i = 0; i < multiselectElems.length; i++) {
            const select = multiselectElems[i];
            const selectHeader = select.querySelector('.multiselect__header')
            const selectBody = select.querySelector('.multiselect__body')
            const selected = select.querySelector('.multiselect__selected')
            const selectItemElems = selectBody.querySelectorAll('.multiselect__item')

            select.addEventListener('click', () => {
                selectHeader.classList.toggle('_show')
            })

            for (let i = 0; i < selectItemElems.length; i++) {
                const item = selectItemElems[i];
                
                item.addEventListener('click', () => {
                    item.classList.toggle('_selected')
                    multiselectSelectedText(selected)
                })
            }
        }

        // Формирование текста со списком с выбранными языками
        function multiselectSelectedText(selected) {
            const itemElems = document.querySelectorAll('.multiselect__item._selected')
            
            if (itemElems.length == 0) {
                selected.innerText = ''
            }
            else {
                let selectedLang = 'Выбрано: '

                for (let i = 0; i < itemElems.length; i++) {
                    const item = itemElems[i];
                    const value = item.innerText
                    
                    if (i != 0) {
                        selectedLang += ', '
                    }
                    selectedLang += value
                }

                selected.innerText = selectedLang
            }

        }
    }

    // Открытие модального окна, если в url указан его id
    openModalHash()
    function openModalHash() {
        if (window.location.hash) {
            const hash = window.location.hash.substring(1)
            const modal = document.querySelector(`.modal-more#${hash}`)

            if (modal) {
                modal.classList.add('_show');
                bodyLock(true)
                closeWhenClickingOnBg(`#${hash} .modal__content`, modal);
            }
        }
    }

    // Закрытие модальных окон при клике по крестику
    closeModalWhenClickingOnCross()
    function closeModalWhenClickingOnCross() {
        const modalElems = document.querySelectorAll('.modal-more')
        for (let i = 0; i < modalElems.length; i++) {
            const modal = modalElems[i];
            const closeThisModal = modal.querySelector('.modal__close')

            closeThisModal.addEventListener('click', () => {
                modal.classList.remove('_show')
                bodyLock(false)
                resetHash()
            })
        }
    }

    // Закрытие модальных окон при нажатии по клавише ESC
    closeModalWhenClickingOnESC()
    function closeModalWhenClickingOnESC() {
        const modalElems = document.querySelectorAll('.modal-more')
        for (let i = 0; i < modalElems.length; i++) {
            const modal = modalElems[i];

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    modal.classList.remove('_show')
                    bodyLock(false)
                    resetHash()
                }
            })
        }
    }

    // Сброс id модального окна в url
    function resetHash() {
        const windowTop = window.pageYOffset
        window.location.hash = ''
        window.scrollTo(0, windowTop)
    }

    // Открытие модальных окон
    openModal()
    function openModal() {
        const btnsOpenModal = document.querySelectorAll('[data-modal-open]');

        for (let i = 0; i < btnsOpenModal.length; i++) {
            const btn = btnsOpenModal[i];

            btn.addEventListener('click', (e) => {
                const dataBtn = btn.dataset.modalOpen;
                const modalThatOpens = document.querySelector(`#${dataBtn}`)

                btn.classList.add('modal-show');
                modalThatOpens.classList.add('_show');
                bodyLock(true)
                closeWhenClickingOnBg(`#${dataBtn} .modal__content`, modalThatOpens);
                window.location.hash = dataBtn
            });
        }
    }

    // Закрытие модального окна при клике по заднему фону
    function closeWhenClickingOnBg(itemArray, itemParent, classShow = '_show') {
        document.addEventListener('click', (e) => {
            let itemElems = document.querySelectorAll(itemArray)

            for (let i = 0; i < itemElems.length; i++) {
                const item = itemElems[i];

                const target = e.target,
                    itsItem = target == item || item.contains(target),
                    itemIsShow = item.classList.contains(classShow);

                if (itemParent) {
                    const itsItemParent = target == itemParent || itemParent.contains(target),
                        itemParentIsShow = itemParent.classList.contains(classShow);

                    if (!itsItem && itsItemParent && itemParentIsShow) {
                        itemParent.classList.remove(classShow);

                        if (body.classList.contains('_lock')) {
                            bodyLock(false)
                        }

                        if (window.location.hash === '#' + itemParent.getAttribute('id')) {
                            resetHash()
                        }
                    }
                } else {
                    if (!itsItem && itemIsShow) {
                        item.classList.remove(classShow);
                        if (body.classList.contains('_lock')) {
                            bodyLock(false)
                        }

                        if (window.location.hash === '#' + itemParent.getAttribute('id')) {
                            resetHash()
                        }
                    }
                }

            }
        })
    }

})

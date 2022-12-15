function S(id) { return document.getElementById(id); }

S("ContactUsButton").addEventListener('click', function () {
    window.location.href = "contact.html";
});

$(document).ready(function () {
    (function () {
        var currentImageIndex = 0;

        var lightboxImages = [];

        $('#MainLightBoxImage').on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            if ((window.screen.width / 2) < e.screenX) {
                if (currentImageIndex < lightboxImages.length - 1) {
                    currentImageIndex++;
                }

            } else {
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                }
            }
            console.log(currentImageIndex)
            $('#MainLightBoxImage').attr('src', lightboxImages[currentImageIndex]);
        });

        $('#MainLightBox').on('click', function (e) {
            S('MainLightBox').style.display = 'none';
        });

        var imgs = S('MainImagesBox').getElementsByTagName('img');
        for (var i = 0; i < imgs.length; i++) {
            lightboxImages.push(imgs[i].src)
        }
        for (var i = 0; i < imgs.length; i++) {

            var element = imgs[i];
            console.log(element)
            element.addEventListener('click', function (e) {
                S('MainLightBox').style.display = 'flex';
                $('#MainLightBoxImage').attr('src', e.target.src);
                currentImageIndex = lightboxImages.indexOf(e.target.src);
            });
        }
    })();
});
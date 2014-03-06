 $(document).ready(function() {
                                var isLoading;
                                var params = {
                                        'feature': 'popular',
                                        'consumer_key': 'UwYxXKmkEzRIhK4EykqRRlItxrdij6eo0Igwz3Wc',
                                        'rpp': 30,
                                        'image_size': [1,2,3,4],
                                        'exclude': 'nude',
                                };
                                function getPage() {
                                        if (isLoading) return;
                                        isLoading = true;
                                        ++params['page'];
                                        $.get('https://api.500px.com/v1/photos?' + $.param(params), function(data) {

                                                markup = '';
                                                $.each(data.photos, function(key, photo) {
                                                  
                                                        console.log(data);
                                                        var url = photo.id;
                                
                                                        url = "http://500px.com/photo/" + url;
                                                        
                                                        markup += '<a data-toggle="modal" data-target="#myModal" data-large-image="' + photo.image_url[2] + '">';
                                                        markup += '<img src ="' + photo.image_url[2] + '"/>'
                                                        markup += '</img>'
                                                        markup += '</a>'
                                                        markup += '<p>' + photo.name + '</p>';
                                                        markup += '</div>';
                                                });
                                                if (params['page'] == 1) {
                                                        $('.f00px').html(markup);

                                                } else {
                                                        $('.f00px').append(markup);
                                                }
                                                isLoading = false;
                                                });

                                                          

                                }

                                $(function() {

                                        $('.f00px').on('click', 'a', imageClickHandler);

                                        function imageClickHandler () {
                                                var largeImageUrl = $(this).data('large-image');
        

                                                $('.modal-body').html('<img src =' + largeImageUrl + '>');

                                        }



                                });

                                $(window).on('scroll', function() {
                                        var threshold = 100;
                                        if (window.innerHeight + document.body.scrollTop > document.body.clientHeight - threshold) {
                                                getPage();
                                        }
                                });
                                $(window).on('hashchange', function() {
                                        var feature = location.hash.replace('#', '');
                                        params['feature'] = feature;
                                        params['page'] = 0;
                                        getPage();
                                        $('.options a').removeClass('active');
                                        $('.options a[href="#' + feature + '"]').addClass('active');
                                });
                                $(window).trigger('hashchange');
                                getPage(1);
                        })
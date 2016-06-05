declare var tinymce, tinyMCE,toMarkdown;
function initAboutEditor(selector:string,$scope) {
    tinymce.init({
        selector: selector,
        language: "zh_TW",
        height: 400,
        content_css: "styles/editor.css,lib/mdl/material.css,lib/bootstrap-3.3.6-dist/css/bootstrap.min.css",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks hr fullscreen",
            "insertdatetime media table contextmenu paste"
        ],
        //menubar: "edit insert view format table",
        menu: {
            file: { title: "File", items: "save" },
            edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
            insert: { title: 'Insert', items: 'insertUrl insertVideo | charmap hr insertdatetime' },
            format: { title: 'Format', items: 'bold italic superscript subscript | formats | removeformat' },
            table: { title: 'Table', items: 'inserttable deletetable | row column' },//strikethrough  underline 
        },
        toolbar: "save | cut copy paste | insertfile undo redo | styleselect | bold strikethrough superscript subscript | bullist numlist | hr",
        contextmenu: "cut copy paste | formats | insertUrl insertVideo | inserttable row column",
        advlist_number_styles: "default",
        advlist_bullet_styles: "default",
        style_formats: [
            {
                title: "Headers", items: [
                    { title: "Header 1", format: "h1" },
                    { title: "Header 2", format: "h2" },
                    { title: "Header 3", format: "h3" },
                    { title: "Header 4", format: "h4" },
                    { title: "Header 5", format: "h5" },
                    { title: "Header 6", format: "h6" }
                ]
            },
            {
                title: "Inline", items: [
                    { title: "Bold", icon: "bold", format: "bold" },
                    /*{ title: "Italic", icon: "italic", format: "italic" },
                    { title: "Underline", icon: "underline", format: "underline" },
                    { title: "Strikethrough", icon: "strikethrough", format: "strikethrough" },*/
                    { title: "Superscript", icon: "superscript", format: "superscript" },
                    { title: "Subscript", icon: "subscript", format: "subscript" },
                    { title: "Code", icon: "code", format: "code" }
                ]
            },
            {
                title: "Blocks", items: [
                    { title: "Paragraph", format: "p" },
                    { title: "Blockquote", format: "blockquote" }
                ]
            }
        ],
        setup: function (ed) {
            ed.addButton('save', {
                title: 'Save',
                icon: 'save',
                onclick: function () {
                    tinymce.activeEditor.execCommand('save');
                }
            });
            ed.addMenuItem('save', {
                text: 'Save',
                icon: 'save',
                onclick: function () {
                    tinymce.activeEditor.execCommand('save');
                }
            });
            ed.addMenuItem('insertUrl', {
                text: 'Insert link',
                icon: 'link',
                onclick: function () {
                    tinymce.activeEditor.execCommand('insertUrl');
                }
            });
            ed.addMenuItem('insertDocument', {
                text: '插入文件連結',
                icon: 'newdocument',
                onclick: function () {
                    tinymce.activeEditor.execCommand('insertDocument');
                }
            });

            ed.addMenuItem('insertVideo', {
                text: 'Insert video',
                icon: 'media',
                onclick: function () {
                    tinymce.activeEditor.execCommand('insertVideo');
                }
            });
            ed.addMenuItem('insertImage', {
                text: 'Insert image',
                icon: 'image',
                onclick: function () {
                    tinymce.activeEditor.execCommand('insertImage');
                }
            });
            ed.addCommand('save',async function (ui, v) {
                var text = tinyMCE.activeEditor.getContent();
                var text2 = parseHTML(text);
                toArray(text2.querySelectorAll('table')).forEach((x: HTMLTableElement) => {
                    if (x.firstElementChild.nodeName != "TBODY") return;
                    var TH = document.createElement('THEAD');
                    x.appendChild(TH);
                    x.insertBefore(TH, x.firstElementChild);
                    try {
                        var TR = x.querySelector("tr");
                        if (TR == null) return;
                        toArray(TR.childNodes).forEach(y => {
                        console.log(y)
                            TH.appendChild(y);
                        });
                        TR.remove();
                    } catch (e){ }
                });
                $scope.user.information = toMarkdown(text2.documentElement.outerHTML, { gfm: true });
                $scope.loading = true;
                swal({
                    title: "儲存中",
                    text: "系統正在儲存您的變更，結束後本視窗自動關閉",
                    showConfirmButton: false
                });
                await $scope.user.updateInformation();
                $scope.loadInformation();
                $scope.loading = false;
                swal.close();
                $scope.$apply();
            });
            ed.addCommand('insertUrl', function (ui, v) {
                $scope.editor.addUrl();
            });
            ed.addCommand('insertVideo', function (ui, v) {
                swal({
                    title: "Youtube影片",
                    text: "請輸入Youtube影片網址:",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "確定",
                    cancelButtonText: "取消",
                    inputPlaceholder: "在這裡輸入欲插入的Youtube影片連結"
                }, function (inputValue) {
                    if (inputValue === false) return false;
                    if (inputValue === "") {
                        swal.showInputError("您必須要輸入影片連結!");
                        return false
                    }
                    if ((<string>inputValue).match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/) == null) {
                        swal.showInputError("不正確的連結格式!(範例:https://www.youtube.com/watch?v=XXXXX)");
                        return false
                    }
                    var result = markdown.toHtml(`![youtube](${inputValue})`);
                    ed.insertContent(result);
                    swal.close()
                });
            });
            ed.on('init', function (ed) {
                console.log(markdown.toHtml($scope.user.information));
                tinyMCE.activeEditor.setContent(markdown.toHtml($scope.user.information));
            });
        }
    });
}

function initEditor(selector) {
    tinymce.init({
        selector: selector,
        height: 600,
        content_css: "styles/editor.css,MDL/material.css",
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks hr fullscreen",
            "insertdatetime media table contextmenu paste"
        ],
        //menubar: "edit insert view format table",
        menu: {
            file: { title: "File", items: "save" },
            edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
            insert: { title: 'Insert', items: 'insertUrl insertImage insertVideo | charmap hr insertdatetime' },
            format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat' },
            table: { title: 'Table', items: 'inserttable deletetable | row column' },
            view: { title: 'View', items: 'fullscreen' }
        },
        toolbar: "save | cut copy paste | insertfile undo redo | styleselect | bold strikethrough superscript subscript | bullist numlist | hr",
        contextmenu: "cut copy paste | formats | insertUrl insertImage insertVideo | inserttable row column",
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
                    { title: "Underline", icon: "underline", format: "underline" },*/
                    { title: "Strikethrough", icon: "strikethrough", format: "strikethrough" },
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
            ed.addCommand('save', function (ui, v) {
                /*//ed.insertContent('Hello world!!<h1>GG</h1>');

                var text = tinyMCE.activeEditor.getContent();
                markdownHTML = toMarkdown(text, { gfm: true });

                document.getElementById('editorSave').click();
                //ed.selection.getContent({ format: 'text' })*/
            });
            ed.addCommand('insertUrl', function (ui, v) {
                document.getElementById('editorAddUrl').click();
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
                    if (inputValue === false)
                        return false;
                    if (inputValue === "") {
                        swal.showInputError("您必須要輸入影片連結!");
                        return false;
                    } /*
                    if (inputValue.match(Config.YoutubeRegex) == null) {
                        swal.showInputError("不正確的連結格式!(範例:https://www.youtube.com/watch?v=XXXXX)");
                        return false
                    }
                    function youtube_parser(url) {
                        var Search = url.split("?", 2);
                        var Data = FormatQueryString(Search[1]);

                        return Data.v || Data.V;
                    }*/
                    var result = '<p><iframe class="youtube-player" width="420" height="315" src="https://www.youtube.com/embed/' + '" frameborder="0" allowfullscreen=""></iframe></p>';
                    ed.insertContent(result);
                    swal.close();
                });
            });
            ed.addCommand('insertImage', function (ui, v) {
                document.getElementById('editorAddImage').click();
            });
            ed.on('init', function (ed) {
                tinyMCE.activeEditor.setContent();
            });
        }
    });
}
//# sourceMappingURL=projectEditor.js.map
/*
Copyright 2023 Ryan Luu

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Toggle content editable
if (document.body.contentEditable === 'true') {
    // Disable editing
    document.body.contentEditable = 'false';
} else {
    // Enable editing
    document.body.contentEditable = 'true';
}

// Block clicking when editing
document.addEventListener('click', function (e) {
    if (document.body.contentEditable === 'true') {
        e.stopImmediatePropagation();
    }
}, true);
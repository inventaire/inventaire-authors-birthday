// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
$(function() {
  console.log('starting!');
  $.get('/tomorrow.json')
  .then(displayCandidates)
  .then(initNav)
  .fail(notifyError.bind(null, 'init nav err'))
  .always(initEvents);

  $('#prev').click(prev);
  $('#next').click(next);

  return $(document).keydown(handleKeys);
});

var initEvents = function() {
  $('.account').click(toggleSelectAccount);
  return $('#validate').click(validate);
};

var displayCandidates = function(data){
  console.log('data attached to window.data', (window.data = data));
  data.forEach(displayCandidate);
  return doneForToday();
};

var doneForToday = () => $('#authors').append("<div class='candidate done'>done for today!</div>");

var displayCandidate = function(candidate){
  const { author, accounts } = candidate;

  const authorHtml = getAuthorHtml(author);
  const accountsHtml = getAccountsHtml(accounts);

  const html = `<div class='candidate' data-q='${author.id}'>${authorHtml}${accountsHtml}</div>`;
  return $('#authors').append(html);
};

var getAuthorHtml = function(author){
  const { id, label, description, picture, website, extract, wikipedia } = author;
  let authorHtml = `<h2><a href='https://www.wikidata.org/wiki/${id}' target='_blank'>${id} - ${label}</a></h2>`;
  if (description != null) { authorHtml += `<h3>${description}</h3>`; }
  if (extract != null) { authorHtml += `<p>${extract}</p>`; }
  if (wikipedia != null) { authorHtml += `<a href='${wikipedia}' target='_blank'>on Wikipedia</a><br>`; }
  if (picture != null) { authorHtml += `<img src='${picture}' alt='no picture'>`; }
  if (website != null) { authorHtml += `<a href='${website}'>${website}</a>`; }
  return `<div class='author'>${authorHtml}</div>`;
};

var getAccountsHtml = function(accounts){
  if (accounts.length <= 0) { return "<div class='accounts'>no accounts found</div>"; }

  const accountsHtml = accounts.map(getAccountHtml).join('');
  return `<div class='accounts'>${accountsHtml}</div>`;
};

var getAccountHtml = function(account){
  const { profile_image_url, name, description, screen_name, location, lang, followers_count, url, verified } = account;
  let accountHtml = `\
<img src="${profile_image_url}" alt="">
<h4>${name}</h4>
<a href='https://twitter.com/${screen_name}' target='_blank'>${screen_name}</a>\
`;

  accountHtml += followers_count > 1000 ? "<p class='over1000'>" : "<p>";
  accountHtml += `<strong>followers:</strong> ${followers_count}</p>`;

  accountHtml += addParagraph('description', description);
  accountHtml += addParagraph('location', location);
  accountHtml += addParagraph('url', url, true);
  accountHtml += addParagraph('verified', verified);
  return `<div class='account' data-p2002='${screen_name}' data-p856='${url}'>${accountHtml}</div>`;
};

var addParagraph = function(property, value, link){
  // handle also verified which is expected to be a boolean
  if (value && (value !== '')) {
    const base = `<p class='${property}' data-value='${value}'><strong>${property}:</strong>`;
    if (link) {
      return `${base}<a href='${value}'>${value}</a></p>`;
    } else {
      return `${base}${value}</p>`;
    }
  } else { return ''; }
};

const activate = $el => $el.addClass('active');
const desactivateActive = function() {
  $('.candidate.active').removeClass('active');
  return $('.selected').removeClass('selected');
};

const updateNav = function() {
  updatePosition('prev');
  return updatePosition('next');
};

var updatePosition = function(position){
  if (clickablePosition(position)) { return $(`#${position}`).show();
  } else { return $(`#${position}`).hide(); }
};

var clickablePosition = position => $('.candidate.active')[position]().length === 1;

var initNav = function() {
  activate($('.candidate').first());
  return updateNav();
};

var prev = function() {
  if (clickablePosition('prev')) {
    const $prev = $('.candidate.active').prev();
    desactivateActive();
    activate($prev);
    return updateNav();
  }
};

var next = function() {
  if (clickablePosition('next')) {
    const $next = $('.candidate.active').next();
    desactivateActive();
    activate($next);
    return updateNav();
  }
};

var handleKeys = function(e){
  switch (e.which) {
    case 37: return prev();
    case 39: return next();
  }
};

var toggleSelectAccount = e => $(e.currentTarget).toggleClass('selected');


var validate = function() {
  const $selected = $('.selected');
  if ($selected.length !== 1) {
    return alert('wrong amount of selected acconts');
  }

  const entity = $selected.parents('.active').attr('data-q');

  postClaim({
    entity,
    property: 'P2002',
    value: $selected.attr('data-p2002')
  });

  if (addWebsite()) {
    resetAddWebsite();
    const update = () => postClaim({
      entity,
      property: 'P856',
      value: $selected.attr('data-p856')
    });

    // updates too close return edit-conflicts from Wikidata
    setTimeout(update, 1000);
  }

  return next();
};

var addWebsite = () => $('#addWebsite')[0].checked;
var resetAddWebsite = () => $('#addWebsite')[0].checked = false;

var postClaim = data => $.post('http://localhost:4115/claim', data)
.then(res => console.log('postClaim res', res))
.fail(notifyError.bind(null, 'postClaim err'));

var notifyError = function(label, err){
  console.error(label, err);
  return alert(label);
};
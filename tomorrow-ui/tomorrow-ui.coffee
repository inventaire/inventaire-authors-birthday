$ ->
  console.log 'starting!'
  $.get '/tomorrow.json'
  .then displayCandidates
  .then initNav
  .fail (err)-> console.error err.stack or err
  .always initEvents

  $('#prev').click prev
  $('#next').click next

  $(document).keydown handleKeys

initEvents = ->
  $('.account').click toggleSelectAccount
  $('#validate').click validate

displayCandidates = (data)->
  console.log 'data attached to window.data', window.data = data
  data.forEach displayCandidate
  doneForToday()

doneForToday = ->
  $('#authors').append "<div class='candidate done'>done for today!</div>"

displayCandidate = (candidate)->
  { author, accounts } = candidate

  authorHtml = getAuthorHtml author
  accountsHtml = getAccountsHtml accounts

  html = "<div class='candidate' data-q='#{author.id}'>#{authorHtml}#{accountsHtml}</div>"
  $('#authors').append html

getAuthorHtml = (author)->
  { id, label, description, picture, website, extract } = author
  authorHtml = "<h2><a href='https://www.wikidata.org/wiki/#{id}' target='_blank'>#{id} - #{label}</a></h2>"
  if description? then authorHtml += "<h3>#{description}</h3>"
  if extract? then authorHtml += "<p>#{extract}</p>"
  if picture? then authorHtml += "<img src='#{picture}' alt='no picture'>"
  if website? then authorHtml += "<a href='#{website}'>#{website}</a>"
  return "<div class='author'>#{authorHtml}</div>"

getAccountsHtml = (accounts)->
  unless accounts.length > 0 then return "<div class='accounts'>no accounts found</div>"

  accountsHtml = accounts.map getAccountHtml
  return "<div class='accounts'>#{accountsHtml}</div>"

getAccountHtml = (account)->
  { profile_image_url, name, description, screen_name, location, lang, followers_count, url, verified } = account
  accountHtml = """
    <img src="#{profile_image_url}" alt="">
    <h4>#{name}</h4>
    <a href='https://twitter.com/#{screen_name}' target='_blank'>#{screen_name}</a>
  """

  accountHtml += if followers_count > 1000 then "<p class='over1000'>" else "<p>"
  accountHtml += "<strong>followers:</strong> #{followers_count}</p>"

  accountHtml += addParagraph 'description', description
  accountHtml += addParagraph 'url', url, true
  accountHtml += addParagraph 'verified', verified
  return "<div class='account' data-p2002='#{screen_name}'>#{accountHtml}</div>"

addParagraph = (property, value, link)->
  # handle also verified which is expected to be a boolean
  if value and value isnt ''
    if link
      "<p><strong>#{property}:</strong> <a href='#{value}'>#{value}</a></p>"
    else
      "<p><strong>#{property}:</strong> #{value}</p>"
  else ''

activate = ($el)-> $el.addClass('active')
desactivateActive = ->
  $('.candidate.active').removeClass 'active'
  $('.selected').removeClass 'selected'

updateNav = ->
  updatePosition 'prev'
  updatePosition 'next'

updatePosition = (position)->
  if clickablePosition(position) then $("##{position}").show()
  else $("##{position}").hide()

clickablePosition = (position)->
  $('.candidate.active')[position]().length is 1

initNav = ->
  activate $('.candidate').first()
  updateNav()

prev = ->
  if clickablePosition 'prev'
    $prev = $('.candidate.active').prev()
    desactivateActive()
    activate $prev
    updateNav()

next = ->
  if clickablePosition 'next'
    $next = $('.candidate.active').next()
    desactivateActive()
    activate $next
    updateNav()

handleKeys = (e)->
  switch e.which
    when 37 then prev()
    when 39 then next()

toggleSelectAccount = (e)->
  $(e.currentTarget).toggleClass 'selected'


validate = ->
  $selected = $('.selected')
  if $selected.length is 0
    alert 'no account selected'
  else if $selected.length is 1
    postClaim
      entity: $selected.parents('.active').attr 'data-q'
      property: 'P2002'
      value: $selected.attr 'data-p2002'
    next()
  else
    alert 'too many accounts selected'


postClaim = (data)->
  $.post 'http://localhost:4115/edit', data
  .then (res)-> console.log('postClaim res', res)
  .fail (err)-> console.error('postClaim err', err)

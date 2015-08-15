$ ->
  console.log 'starting!'
  $.get '/tomorrow.json'
  .then displayCandidates
  .then initNav
  .fail (err)-> console.error err.stack or err

  $('#prev').click prev
  $('#next').click next

  $(document).keydown handleKeys


displayCandidates = (data)->
  console.log 'data', data
  data.forEach displayCandidate
  doneForToday()

doneForToday = ->
  $('#authors').append "<div class='candidate done'>done for today!</div>"

displayCandidate = (candidate)->
  { author, accounts } = candidate

  authorHtml = getAuthorHtml author
  accountsHtml = getAccountsHtml accounts

  html = "<div class='candidate'>#{authorHtml}#{accountsHtml}</div>"
  $('#authors').append html

getAuthorHtml = (author)->
  { id, label, description, picture, website } = author
  authorHtml = "<h2><a href='https://www.wikidata.org/wiki/#{id}' target='_blank'>#{id} - #{label}</a></h2>"
  if description? then authorHtml += "<h3>#{description}</h3>"
  if extract? then authorHtml += "<p>#{extract}</p>"
  if picture? then authorHtml += "<img src='#{picture}' alt='no picture'>"
  if website? then authorHtml += "<p>#{website}</p>"
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
  accountHtml += addParagraph 'url', url
  accountHtml += addParagraph 'verified', verified
  return "<div class='account'>#{accountHtml}</div>"

addParagraph = (property, value)->
  # handle also verified which is expected to be a boolean
  if value and value isnt '' then "<p><strong>#{property}:</strong> #{value}</p>" else ''

activate = ($el)-> $el.addClass('active')
desactivateActive = -> $('.candidate.active').removeClass('active')

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

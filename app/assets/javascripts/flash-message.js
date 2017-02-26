$(document).ready(function() {
  setTimeout(function() {
    $('.flash-message.bg-success').addClass('is-inactive');
  }, 3000);

  $("[data-action='clear-flash']").on('click', function() {
    $('.flash-message').addClass('is-inactive');
  });
});
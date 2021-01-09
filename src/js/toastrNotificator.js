import toastr from 'toastr';

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-bottom-center',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

export default {
  info() {
    toastr['info'](
      'This is all what we have with this tags ¯_(ツ)_/¯',
      'That`s All, Folks!',
    );
  },

  error() {
    toastr.options.positionClass = 'toast-top-center';

    toastr['error'](
      "Please try search something else (●'◡'●)",
      'Unlucky Query...',
    );
  },
};

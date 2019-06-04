import { trigger, state, style, transition, animate, animateChild, query } from '@angular/animations';

export const animateSideNav = trigger('animateSideNav', [
    state('close',
      style({
        'min-width': '58px',
      })
    ),
    state('open',
      style({
        'min-width': '270px',
      })
    ),
    transition('close => open', animate('250ms ease-in')),
    transition('open => close', animate('250ms ease-in')),
  ]);

export const animateSideNavContent = trigger('animateSideNavContent', [
    state('close',
      style({
        // 'margin-left': '82px'
        'margin-left': '62px'
      })
    ),
    state('open',
      style({
        'margin-left': '270px'
      })
    ),
    transition('close => open', animate('250ms ease-in')),
    transition('open => close', animate('250ms ease-in')),
  ]);


export const displayMenuText = trigger('displayMenuText', [
    state('hide',
      style({
        display: 'none',
        opacity: 0,
      })
    ),
    state('show',
      style({
        display: 'block',
        opacity: 1,
      })
    ),
    transition('close => open', animate('350ms ease-in')),
    transition('open => close', animate('200ms ease-out')),
  ]);

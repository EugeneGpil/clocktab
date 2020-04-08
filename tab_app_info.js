import logoUrl from './logo.svg';
import assert from '@brillout/assert';

import React from 'react';

export const tab_app_name = "Clock Tab";
export const tab_app_url = "https://www.clocktab.com";
export const tab_app_source_code = "https://github.com/brillout/clocktab";
export const tab_app_mail = compute_mail('clocktab');
export const tab_app_logo = logoUrl;
export const tab_subapp_ids = [
  'clock_',
  'countdown_',
];
export const tab_app_header_links = [
  {link_url: '/countdown', link_name: 'Countdown'},
  {link_url: '/world-clock', link_name: 'World Clock'},
  {link_url: '/history', link_name: 'History'},
  {link_url: 'https://www.timer-tab.com', link_name: 'Timer Tab', link_target: "_blank"},
  {link_url: '/msg-tab', link_name: 'Msg Tab'},
];
export const TabAppRoadmap = () => <>
  <li>Make Clock Tab more robust. (Less bugs, more resilient, and please <a href="/bug-repair">report any bug</a> you may find!)</li>
  <li>Make Clock Tab work offline.</li>
  <li>Remove memory leak. (Clock Tab can sometimes consumes a lot of CPU and RAM.)</li>
  <li>Detect and adapt to browser dark theme mode.</li>
  <li>Improve theme customization.</li>
  <li>More themes.</li>
  <li>Beautiful analog clock.</li>
  <li>Option to move position of Clock, e.g. in the top left corner.</li>
  <li>Option to set  YouTube live stream as background.</li>
  <li>Make Clock Tab load faster.</li>
</>;

function compute_mail(mail_user) {
  const at = String.fromCharCode(2*32);
  // fuck-spam-crawlers@brillout.com
  const mail = mail_user + at + 'brillout'+'.'+'com';
  assert(at==='@');
  return mail;
}
const {test,expect}=require('@playwright/test');
const AxeBuilder=require('@axe-core/playwright').default;
test('actual crypto roundtrip and tamper rejection',async({page})=>{
 await page.goto('/#lesson-43');await page.locator('#tab-simulation').click();await page.locator('#crypto-run').click();await expect(page.locator('#crypto-result')).toContainText('Changed ciphertext was rejected');await expect(page.locator('#crypto-result')).not.toContainText('FAIL');await expect(page.locator('#crypto-result td').filter({hasText:'PASS'})).toHaveCount(3);
});
test('language persists, deep lesson, model, notes and responsive overflow',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#settings');await page.locator('#language').selectOption('ta');await page.reload();await expect(page.locator('html')).toHaveAttribute('lang','ta');
 await page.goto('/#lesson-63');await expect(page.locator('#panel')).toContainText('TCP');await expect(page.locator('#panel')).toContainText(/[஀-௿]/);
 await page.locator('#tab-simulation').click();await expect(page.locator('#modelError')).toBeEmpty();
 await page.locator('#tab-notes').click();await page.locator('#lessonNote').fill('Tamil QA குறிப்பு');await page.locator('#saveNote').click();await page.reload();await page.locator('#tab-notes').click();await expect(page.locator('#lessonNote')).toHaveValue('Tamil QA குறிப்பு');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();expect(errors).toEqual([]);
});
test('graded challenge and final exam prevent unanswered submission',async({page})=>{
 await page.goto('/#challenges');await page.locator('#answer-subnet').fill('192.168.7.128');await page.locator('[data-grade="subnet"]').click();await expect(page.locator('#grade-subnet')).toContainText('passed');
 await page.goto('/#academy');await page.locator('#study-start').click();await expect(page.locator('#exam-form fieldset')).toHaveCount(30);await page.locator('#study-submit').click();await expect(page.locator('#exam-result')).toContainText('Answer every');
});
test('numeric model recomputes and invalid input recovers',async({page})=>{
 await page.goto('/#tools');await page.locator('#modelSelect').selectOption('ntp');await page.locator('#control-back').fill('100');await page.locator('[data-event="1"]').click();await expect(page.locator('#stateTable')).toContainText('-40');
 await page.locator('#modelSelect').selectOption('subnet');await page.locator('#control-cidr').fill('999.1.1.1/24');await expect(page.locator('#modelError')).not.toBeEmpty();await page.locator('#control-cidr').fill('10.0.0.5/31');await expect(page.locator('#modelExtra')).toContainText('10.0.0.4/31');
});
test('offline cached lesson loads after initial installation',async({page,context})=>{
 await page.goto('/');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.reload();await expect.poll(()=>page.evaluate(()=>!!navigator.serviceWorker.controller)).toBeTruthy();
 await context.setOffline(true);await page.goto('/#lesson-64');await expect(page.locator('#panel')).toContainText('DNS');await context.setOffline(false);
});
test('keyboard tabs and automated accessibility in both languages',async({page})=>{
 for(const language of ['en','ta']){await page.goto('/#settings');await page.locator('#language').selectOption(language);await page.goto('/#lesson-12');await page.locator('#tab-learn').focus();await page.keyboard.press('ArrowRight');await expect(page.locator('#tab-simulation')).toHaveAttribute('aria-selected','true');
 const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(results.violations.filter(v=>['critical','serious'].includes(v.impact))).toEqual([]);}
});

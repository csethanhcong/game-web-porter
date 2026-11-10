// Deviation flags / cờ lệch có chủ ý so với bản gốc. Một nơi duy nhất.
// Mỗi cờ: tên, mặc định, mô tả hành vi gốc vs mới, tham chiếu FORMATS.md "DEVIATION: <name>".
// Mặc định do USER quyết định (không tự bật khi chưa được yêu cầu).

// Ví dụ: gỡ giới hạn shareware/demo.
// true  = không timer/nag/BUY NOW, mở mọi màn. false = hành vi demo gốc.
// DELIBERATE DEVIATION from the original (see FORMATS.md "DEVIATION: UNLOCK_ALL").
export const UNLOCK_ALL = true;

// Debug hooks (window.__*) - không đổi gameplay.
export const DEBUG_HOOKS = true;

// Thêm cờ mới theo mẫu:
// export const <FLAG> = <default>; // gốc: ...; mới: ...; FORMATS "DEVIATION: <FLAG>"

// GUESS (G-R01 phần dạng three): hướng đèn DIRECTIONAL trong không gian three dưới mirror root.
// 'mirrored' (mặc định) = L_three = (-C20, C21, -C22) (C = ma trận world D3D không mirror; engine L_D3D=(C20,C21,-C22) rồi phản xạ x như mọi vector);
// 'literal'  = đúng chữ FORMATS 'PORT vs ENGINE' mục 4: L = (W20, W21, -W22) với W = matrixWorld có mirror (KHÔNG đảo x).
// Công thức engine CONFIRMED, chỉ phần suy ra dạng three là GUESS. Không phải lệch có chủ ý so với gốc.
export const DIRLIGHT_THREE_FORM = 'mirrored';

// ---- Gameplay GUESS flags (src/game/**). Chi tiet: GUESS_REGISTER.md G-GAME-*, FORMATS.md 'Gameplay'. Khong phai lech co chu y; tat/bat de so voi ban goc. ----
// G-GAME-01: StrategyGlobalCounter = "presence" counter: enter +Step (mac dinh 1), exit -Step; khi chay trong EventHandler thi cong Step mot lan. Tuong thich du lieu (Explode Step=-1, Dead, handler AnimFinished Step=-1).
export const GAME_GLOBALCOUNTER_PRESENCE = true;
// G-GAME-02: StrategyChangeCounter/CheckCounter doc-ghi bag property cua OBJECT (du lieu: HitPoints/Damage/BonusFast la property cuc bo cua tank); FORMATS ghi 'global' nhung data (tank_collision.state: ChangeCounter HitPoints Step=Damage cua go) chi khop voi bag object. ChangeGlobalCounter/CheckGlobalCounter = bag global.
export const GAME_COUNTER_LOCAL = true;
// G-GAME-03: ban phim (gốc: GC_KeyboardLayout_1/2 chua doc). P1: mui ten + Ctrl (CONFIRMED G-X21; Space/Z KHONG co trong goc); P2: WASD + Tab.
export const GAME_KEYS_P1 = { up: 'ArrowUp', right: 'ArrowRight', down: 'ArrowDown', left: 'ArrowLeft', fire: ['ControlLeft', 'ControlRight'] }; // CONFIRMED G-X21 GC_KeyboardLayout_1: arrows + Ctrl
export const GAME_KEYS_P2 = { up: 'KeyW', right: 'KeyD', down: 'KeyS', left: 'KeyA', fire: ['Tab'] }; // CONFIRMED G-X21 GC_KeyboardLayout_2: WASD + Tab
// G-GAME-04: dao chieu giua o (G-X11c): true = o logic quay ve o truoc, p'=1-p (giu lien tuc thi giac); false = doi toi tam o roi moi quay.
export const GAME_REVERSE_MIDCELL = true;
// G-GAME-05 DONG (CONFIRMED 0x4914d0/0x495760): p cua vien dan = p hien tai cua xe ban (visitor+0x18 = pos+8), turn=0 (DAT_004f4660=0.0). Port dung go.pos.p; co cu GAME_BULLET_P da xoa.
// G-GAME-06: AnimFinished (0x411cd0 strict t>len, chi non-loop). Cong thuc da CONFIRMED; nguon length (+0xc0)=max Key/Execute Time van GUESS; state khong co anim bi bo qua (GUESS).
export const GAME_ANIMFINISHED_NONLOOP_ONLY = true;
// G-GAME-07 DONG (CONFIRMED 0x447730): TimeCounter = Start + Step*trunc(acc) kep [MinValue=0, MaxValue=0x7fffffff]; co GAME_TIMECOUNTER_CLAMP0 da xoa.
// G-GAME-08 DA DONG (0x492c20): MoveFind = gan nhat Manhattan + offset rng trong hop; co flag cu GAME_MOVEFIND_NO_OFFSET da xoa.
// DEVIATION: GAME_DT_CLAMP (FORMATS 'ENGINE: vong lap': goc KHONG clamp dt). Kep dt toi da (giay) de tab bi an/lag khong lam xe xuyen tuong; 0 = tat (dung goc).
export const GAME_DT_CLAMP = 0.1;

// ---- Render GUESS flags (src/render/**, src/loader/**). Chi tiet: GUESS_REGISTER.md G-R10. ----
// G-R10: Billboard node quay theo huong camera (khong co bang chung engine). false = node tinh (khong ve gi vi popup an) nhu truoc.
export const BILLBOARD_FACE_CAMERA = true;
// G-R10: xoay them 180 do quanh y cua billboard neu quad hien mat sau (chi doi khi qa-visual bao).
export const BILLBOARD_YAW_FLIP = false;
// DEVIATION: PARTICLES (FORMATS 'ENGINE: particles'): false = khong tao ParticleSystem (nhu truoc khi port). Mac dinh BAT = dung goc.
export const PARTICLES = true;
export const GAME_KEY_MENU = 'Escape'; // CONFIRMED G-X21: GCMenuBack = Esc (P1 only)
export const GAME_MENU_PAUSE = true; // CONFIRMED vong 19 (0x4426c0 chi update man dinh stack) G-GAME-11: level update paused while GameMenu is stacked on top
export const GAME_CAMERA_ANGLE = true; // G-GAME-12 closed (decompile round 7: BACK=(0,0.8,0.5)); informational

// DEVIATION: UI_LINK_FALLBACK_MENU (FORMATS 'DEVIATION: UI_LINK_FALLBACK_MENU'): original THROWS when a link / episode node / screen does not exist (0x441c70 "Failed to load screen", 0x449500 "Failed to find episode node"). true = log warn and show MainMenu; false = throw like the original.
export const UI_LINK_FALLBACK_MENU = true;

// DEVIATION: HISCORE_LOCALSTORAGE (FORMATS 'DEVIATION: HISCORE_LOCALSTORAGE'): original keeps the hiscore table in %local_appdata%/%app_name%/*.xml|.results (InternetHiscore 0x462430, init 0x44d5e0). true = persist the table in localStorage (try/catch; renders fine without storage); false = table lives only for the session.
export const HISCORE_LOCALSTORAGE = true;

// G-UI-11 (GUESS): ControlPassword match case. false = exact string compare with the data (lower case); true = fold case. FORMATS 'Port ControlPassword'.
export const UI_PASSWORD_CASE_INSENSITIVE = true; // CONFIRMED original behaviour (0x452410); false = deviation (exact match)
// DEVIATION: INPUT_DEVICES_WEB (FORMATS 'DEVIATION: INPUT_DEVICES_WEB'): original ControlInputSelector lists the machine's input hardware (0x4505e0, DAT_0052bdd4); web offers only the two keyboard layouts (no gamepad).
export const INPUT_DEVICES_WEB = ['GC_KeyboardLayout_1', 'GC_KeyboardLayout_2'];
// G-UI-12 (GUESS): left click places data/hole.scene (0x40b4e0); guard (this-0x548) unknown -> whenever a scene is shown. MAX = implementation cap (not original).
// DEVIATION flag: original shoots holes only during its Loading screen (app+0x238 != 0, 0x40b4e0); port has none -> default off = faithful. true = holes in every shown scene.
export const UI_MOUSE_HOLES = false;
export const UI_MOUSE_HOLES_MAX = 300;

// ---- Audio (src/audio/**). FORMATS 'PORT: Audio'. ----
// DEVIATION: SETTINGS_LOCALSTORAGE (FORMATS 'DEVIATION: SETTINGS_LOCALSTORAGE'): original keeps UI properties (MusicFlag) in settings.dat 0x40c660 / properties.xml 0x4556d0. true = persist MusicFlag in localStorage (try/catch; works without storage); false = session only.
export const SETTINGS_LOCALSTORAGE = true;
// GUESS G-AUDIO-01: ChannelType 3D plays through a PannerNode (inverse distance, refDistance = MinDistance) relative to the SoundListener node. false = every sound plays as 2D.
export const AUDIO_3D = true;

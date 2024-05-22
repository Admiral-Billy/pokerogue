import BattleScene from "../battle-scene";
import { TextStyle, addTextObject } from "./text";
import { WindowVariant, addWindow } from "./ui-theme";
import * as Utils from "../utils";
import i18next from "i18next";

export class EventBoard extends Phaser.GameObjects.Container {
  private eventLabel: Phaser.GameObjects.Text;
  private changelog: Phaser.GameObjects.Text;
  private prevPageButton: Phaser.GameObjects.Sprite;
  private pageNumberLabel: Phaser.GameObjects.Text;
  private nextPageButton: Phaser.GameObjects.Sprite;

  private pageCount: integer;
  private page: integer;

  constructor(scene: BattleScene, x: number, y: number) {
    super(scene, x, y);

    this.setup();
  }

  setup() {
    const titleWindow = addWindow(this.scene, 0, 0, 114, 18, false, false, null, null, WindowVariant.THIN);
    this.add(titleWindow);

    this.eventLabel = addTextObject(this.scene, titleWindow.displayWidth / 2, titleWindow.displayHeight / 2, i18next.t('menu:event-text'), TextStyle.WINDOW, { fontSize: '64px' });
    this.eventLabel.setOrigin(0.5, 0.5);
    this.add(this.eventLabel);

    const window = addWindow(this.scene, 0, 17, 114, 118, false, false, null, null, WindowVariant.THIN);
    this.add(window);

    this.changelog = addTextObject(this.scene, 8, 4 + titleWindow.displayHeight, "Hey there yall, I've got a few patch notes here for ya today my roguelings, hope you enjoy them my big chunguses", TextStyle.WINDOW, { fontSize: '64px', wordWrap: { width: 592, useAdvancedWrap: true } });
    this.changelog.setOrigin(0, 0);
    this.add(this.changelog);

//    this.prevPageButton = this.scene.add.sprite(window.displayWidth / 2 - 16, titleWindow.displayHeight + window.displayHeight - 15, 'cursor_reverse');
//    this.prevPageButton.setOrigin(0, 0);
//    this.prevPageButton.setAlpha(0.5);
//    this.add(this.prevPageButton);

//    this.prevPageButton.setInteractive(new Phaser.Geom.Rectangle(0, 0, 6, 10), Phaser.Geom.Rectangle.Contains);
//    this.prevPageButton.on('pointerup', () => {
//      if (this.page > 1)
//        this.update(undefined, this.page > 1 ? this.page - 1 : this.pageCount);
//    });

//    this.pageNumberLabel = addTextObject(this.scene, window.displayWidth / 2, titleWindow.displayHeight + window.displayHeight - 16, '1', TextStyle.WINDOW, { fontSize: '64px' });
//    this.pageNumberLabel.setOrigin(0.5, 0);
//    this.add(this.pageNumberLabel);

//    this.nextPageButton = this.scene.add.sprite(window.displayWidth / 2 + 16, titleWindow.displayHeight + window.displayHeight - 15, 'cursor');
//    this.nextPageButton.setOrigin(1, 0);
//    this.nextPageButton.setAlpha(0.5);
//    this.add(this.nextPageButton);

//    this.nextPageButton.setInteractive(new Phaser.Geom.Rectangle(0, 0, 6, 10), Phaser.Geom.Rectangle.Contains);
//    this.nextPageButton.on('pointerup', () => {
//    if (this.page < this.pageCount)
//      this.update(undefined, this.page < this.pageCount ? this.page + 1 : 0);
//    });

//    this.page = 1;
  }

  /**
   * Sets the state of the navigation buttons.
   * @param {boolean} [enabled=true] - Whether the buttons should be enabled or disabled.
   */
  setButtonsState(enabled: boolean = true) {
    const buttons = [
      { button: this.prevPageButton, alphaValue: enabled ? (this.page > 1 ? 1 : 0.5) : 0.5 },
      { button: this.nextPageButton, alphaValue: enabled ? (this.page < this.pageCount ? 1 : 0.5) : 0.5 },
      { button: this.nextCategoryButton, alphaValue: enabled ? 1 : 0.5 },
      { button: this.prevCategoryButton, alphaValue: enabled ? 1 : 0.5 }
    ];

    buttons.forEach(({ button, alphaValue }) => {
      if (enabled) {
        button.setInteractive();
      } else {
        button.disableInteractive();
      }
      button.setAlpha(alphaValue);
    });
  }
}

export interface EventBoard {
  scene: BattleScene
};
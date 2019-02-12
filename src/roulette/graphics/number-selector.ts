import { Sprite, DisplayObject } from 'pixi.js';
import { INumberSprite } from './inumber-sprite';
import { RouletteComponent } from './roulette-component';

export class NumberSelector {
    private components: RouletteComponent[];
    private spritesData: INumberSprite[];

    getComponents(): RouletteComponent[] {
        return this.components;
    }

    setComponents(sprites: RouletteComponent[]) {
        this.components = sprites;
    }

    setSpritesData(spritesData : INumberSprite[]) {
        this.spritesData = spritesData;
    }
    

    rowSelector(row, callback) {
        Object.keys(this.spritesData)
        .forEach(key => {
            if (key === 'default') return;
            if (this.spritesData[key].row == row) {
                callback(this.components[key]);
            }
        });
    }

    groupSelector(group, callback) {
        group.forEach((number) => {
            callback(this.components[number], number);
        });
    }

    rangeSelector(from, to, callback) {
        for(let i = from; i <= to; i++) {
            callback(this.components[i]);
        }
    }

    colorSelector(color, callback) {
        Object.keys(this.spritesData)
        .forEach(key => {
            if (key === 'default') return;
            if (this.spritesData[key].color == color) {
                callback(this.components[key]);
            }
        });
    }

    paritySelector(type: string, callback: Function) {
        if (type === 'even') {
            for(let i = 0; i <= 36; i+=2) {
                callback(this.components[i]);
            }
        } else {
            for(let i = 1; i < 36; i+=2) {
                callback(this.components[i]);
            }
        }
    }

    all(callback: Function) {
        Object.keys(this.spritesData)
        .forEach(key => {
            if (key === 'default') return;
            callback(this.components[key]);
        });
    }

    select(key: string, callback: Function) {
        if (/^\d+$/.test(key)) {
            this.groupSelector([key], callback);
        }
        else if (key.includes('2to1')) {
            let row = parseInt(key[key.length - 1]);
            this.rowSelector(row, callback);
        }
        else if (/^\d.*?12$/.test(key)) {
            this.rangeSelector(+key[0] * 12 - 11, +key[0] * 12, callback);
        } else if (/^black|red$/.test(key)) {
            this.colorSelector(key, callback);
        }
        else if (/^even|odd$/.test(key)) {
            this.paritySelector(key, callback);
        }
        else if (/^\d+to\d+$/.test(key)) {
            const matches = key.match(/^(\d+)to(\d+)$/);
            this.rangeSelector(parseInt(matches[1]), parseInt(matches[2]), callback);
        }
    }
    
}

import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of a skill. */
export interface Iskill {

    /** skill id */
    id?: (number|null);

    /** skill lv */
    lv?: (number|null);
}

/** Represents a skill. */
export class skill implements Iskill {

    /**
     * Constructs a new skill.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iskill);

    /** skill id. */
    public id: number;

    /** skill lv. */
    public lv: number;

    /**
     * Creates a new skill instance using the specified properties.
     * @param [properties] Properties to set
     * @returns skill instance
     */
    public static create(properties?: Iskill): skill;

    /**
     * Encodes the specified skill message. Does not implicitly {@link skill.verify|verify} messages.
     * @param message skill message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iskill, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified skill message, length delimited. Does not implicitly {@link skill.verify|verify} messages.
     * @param message skill message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iskill, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a skill message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns skill
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): skill;

    /**
     * Decodes a skill message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns skill
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): skill;

    /**
     * Verifies a skill message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a skill message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns skill
     */
    public static fromObject(object: { [k: string]: any }): skill;

    /**
     * Creates a plain object from a skill message. Also converts values to other types if specified.
     * @param message skill
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: skill, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this skill to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for skill
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a special_skill. */
export interface Ispecial_skill {

    /** special_skill version */
    version?: (number|null);

    /** special_skill spe_skill_id */
    spe_skill_id?: (number|null);

    /** special_skill spe_skill_lv */
    spe_skill_lv?: (number|null);

    /** special_skill status */
    status?: (number|null);
}

/** Represents a special_skill. */
export class special_skill implements Ispecial_skill {

    /**
     * Constructs a new special_skill.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ispecial_skill);

    /** special_skill version. */
    public version: number;

    /** special_skill spe_skill_id. */
    public spe_skill_id: number;

    /** special_skill spe_skill_lv. */
    public spe_skill_lv: number;

    /** special_skill status. */
    public status: number;

    /**
     * Creates a new special_skill instance using the specified properties.
     * @param [properties] Properties to set
     * @returns special_skill instance
     */
    public static create(properties?: Ispecial_skill): special_skill;

    /**
     * Encodes the specified special_skill message. Does not implicitly {@link special_skill.verify|verify} messages.
     * @param message special_skill message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ispecial_skill, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified special_skill message, length delimited. Does not implicitly {@link special_skill.verify|verify} messages.
     * @param message special_skill message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ispecial_skill, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a special_skill message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns special_skill
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): special_skill;

    /**
     * Decodes a special_skill message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns special_skill
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): special_skill;

    /**
     * Verifies a special_skill message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a special_skill message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns special_skill
     */
    public static fromObject(object: { [k: string]: any }): special_skill;

    /**
     * Creates a plain object from a special_skill message. Also converts values to other types if specified.
     * @param message special_skill
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: special_skill, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this special_skill to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for special_skill
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** attr_label enum. */
export enum attr_label {
    none = 0,
    atk = 1,
    def = 2,
    hp_max = 3,
    spd = 4,
    crit = 5,
    crit_down = 6,
    crit_dmg = 7,
    crit_dmg_down = 8,
    hit = 9,
    dodge = 10,
    cure = 11,
    be_cure = 12,
    debuff = 13,
    debuff_down = 14,
    p_hurt_up = 15,
    p_hurt_down = 16,
    m_hurt_up = 17,
    m_hurt_down = 18,
    suck = 19,
    def_ignore = 20,
    final_hurt_up = 21,
    final_hurt_down = 22,
    rage = 23,
    skill_hurt_up = 24,
    holy_hurt_up = 25,
    career_up_1 = 26,
    career_up_2 = 27,
    career_up_3 = 28,
    career_up_4 = 29,
    career_up_5 = 30,
    career_down_1 = 31,
    career_down_2 = 32,
    career_down_3 = 33,
    career_down_4 = 34,
    career_down_5 = 35,
    camp_down_1 = 36,
    camp_down_2 = 37,
    camp_down_3 = 38,
    camp_down_4 = 39,
    camp_down_5 = 40,
    camp_down_6 = 41,
    boss = 42,
    atk_up = 43,
    def_up = 44,
    hp_max_up = 45,
    spd_up = 46,
    com = 47,
    con = 48,
    str = 49,
    inte = 50,
    arm = 51,
    crt = 52,
    crt_def = 53,
    acc = 54,
    dod = 55,
    crt_dmg = 56,
    atk_spd = 57,
    mov_spd = 58,
    shield = 59,
    skill_anger = 60,
    back_hurt = 61,
    energy = 62,
    com_up = 63,
    con_up = 64,
    str_up = 65,
    inte_up = 66,
    arm_up = 67,
    crt_up = 68,
    crt_def_up = 69,
    acc_up = 70,
    dod_up = 71,
    rge_radius = 72,
    dam_width = 73,
    dam_height = 74,
    con_suck = 75,
    con_return_spd = 76,
    gold_dmg = 77,
    gold_res = 78,
    sub_gold_res = 79,
    wood_dmg = 80,
    wood_res = 81,
    sub_wood_res = 82,
    water_dmg = 83,
    water_res = 84,
    sub_water_res = 85,
    fire_dmg = 86,
    fire_res = 87,
    sub_fire_res = 88,
    soil_dmg = 89,
    soil_res = 90,
    sub_soil_res = 91,
    thunder_dmg = 92,
    thunder_res = 93,
    sub_thunder_res = 94,
    wind_dmg = 95,
    wind_res = 96,
    sub_wind_res = 97,
    rock_dmg = 98,
    rock_res = 99,
    sub_rock_res = 100
}

/** Represents an attr. */
export class attr implements Iattr {

    /**
     * Constructs a new attr.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iattr);

    /** attr label. */
    public label: attr_label;

    /** attr val. */
    public val: number;

    /**
     * Creates a new attr instance using the specified properties.
     * @param [properties] Properties to set
     * @returns attr instance
     */
    public static create(properties?: Iattr): attr;

    /**
     * Encodes the specified attr message. Does not implicitly {@link attr.verify|verify} messages.
     * @param message attr message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iattr, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified attr message, length delimited. Does not implicitly {@link attr.verify|verify} messages.
     * @param message attr message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iattr, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an attr message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns attr
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): attr;

    /**
     * Decodes an attr message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns attr
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): attr;

    /**
     * Verifies an attr message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an attr message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns attr
     */
    public static fromObject(object: { [k: string]: any }): attr;

    /**
     * Creates a plain object from an attr message. Also converts values to other types if specified.
     * @param message attr
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: attr, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this attr to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for attr
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_1. */
export class reply_1 implements Ireply_1 {

    /**
     * Constructs a new reply_1.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_1);

    /** reply_1 status. */
    public status: number;

    /** reply_1 message. */
    public message: string;

    /**
     * Creates a new reply_1 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_1 instance
     */
    public static create(properties?: Ireply_1): reply_1;

    /**
     * Encodes the specified reply_1 message. Does not implicitly {@link reply_1.verify|verify} messages.
     * @param message reply_1 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_1, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_1 message, length delimited. Does not implicitly {@link reply_1.verify|verify} messages.
     * @param message reply_1 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_1, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_1 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_1
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_1;

    /**
     * Decodes a reply_1 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_1
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_1;

    /**
     * Verifies a reply_1 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_1 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_1
     */
    public static fromObject(object: { [k: string]: any }): reply_1;

    /**
     * Creates a plain object from a reply_1 message. Also converts values to other types if specified.
     * @param message reply_1
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_1, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_1 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_1
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an other_player. */
export class other_player implements Iother_player {

    /**
     * Constructs a new other_player.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iother_player);

    /** other_player player_id. */
    public player_id: number;

    /** other_player srvno. */
    public srvno: string;

    /** other_player nickname. */
    public nickname: string;

    /** other_player head_id. */
    public head_id: number;

    /** other_player head_border. */
    public head_border: number;

    /** other_player figure. */
    public figure: number;

    /** other_player color. */
    public color: number;

    /** other_player designation. */
    public designation: number;

    /** other_player lv. */
    public lv: number;

    /** other_player power. */
    public power: number;

    /** other_player online_flag. */
    public online_flag: number;

    /** other_player last_logout_time. */
    public last_logout_time: number;

    /** other_player guild_guid. */
    public guild_guid: string;

    /** other_player guild_name. */
    public guild_name: string;

    /** other_player vip. */
    public vip: number;

    /** other_player cur_grade. */
    public cur_grade: number;

    /** other_player pvp_rank_id. */
    public pvp_rank_id: number;

    /** other_player history_max_grade. */
    public history_max_grade: number;

    /** other_player total_victory_num. */
    public total_victory_num: number;

    /** other_player total_defeated_num. */
    public total_defeated_num: number;

    /** other_player total_draw_num. */
    public total_draw_num: number;

    /** other_player adventure_level_progress. */
    public adventure_level_progress: number;

    /** other_player max_chapter. */
    public max_chapter: number;

    /** other_player career. */
    public career: number;

    /** other_player endlessChallengeMaxScore. */
    public endlessChallengeMaxScore: number;

    /**
     * Creates a new other_player instance using the specified properties.
     * @param [properties] Properties to set
     * @returns other_player instance
     */
    public static create(properties?: Iother_player): other_player;

    /**
     * Encodes the specified other_player message. Does not implicitly {@link other_player.verify|verify} messages.
     * @param message other_player message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iother_player, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified other_player message, length delimited. Does not implicitly {@link other_player.verify|verify} messages.
     * @param message other_player message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iother_player, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an other_player message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns other_player
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): other_player;

    /**
     * Decodes an other_player message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns other_player
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): other_player;

    /**
     * Verifies an other_player message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an other_player message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns other_player
     */
    public static fromObject(object: { [k: string]: any }): other_player;

    /**
     * Creates a plain object from an other_player message. Also converts values to other types if specified.
     * @param message other_player
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: other_player, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this other_player to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for other_player
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a player_full_id. */
export class player_full_id implements Iplayer_full_id {

    /**
     * Constructs a new player_full_id.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iplayer_full_id);

    /** player_full_id player_id. */
    public player_id: number;

    /** player_full_id srvno. */
    public srvno: string;

    /**
     * Creates a new player_full_id instance using the specified properties.
     * @param [properties] Properties to set
     * @returns player_full_id instance
     */
    public static create(properties?: Iplayer_full_id): player_full_id;

    /**
     * Encodes the specified player_full_id message. Does not implicitly {@link player_full_id.verify|verify} messages.
     * @param message player_full_id message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iplayer_full_id, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified player_full_id message, length delimited. Does not implicitly {@link player_full_id.verify|verify} messages.
     * @param message player_full_id message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iplayer_full_id, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a player_full_id message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns player_full_id
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): player_full_id;

    /**
     * Decodes a player_full_id message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns player_full_id
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): player_full_id;

    /**
     * Verifies a player_full_id message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a player_full_id message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns player_full_id
     */
    public static fromObject(object: { [k: string]: any }): player_full_id;

    /**
     * Creates a plain object from a player_full_id message. Also converts values to other types if specified.
     * @param message player_full_id
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: player_full_id, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this player_full_id to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for player_full_id
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a player_to_player_full_id. */
export class player_to_player_full_id implements Iplayer_to_player_full_id {

    /**
     * Constructs a new player_to_player_full_id.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iplayer_to_player_full_id);

    /** player_to_player_full_id player_full_id_1. */
    public player_full_id_1?: (Iplayer_full_id|null);

    /** player_to_player_full_id player_full_id_2. */
    public player_full_id_2?: (Iplayer_full_id|null);

    /**
     * Creates a new player_to_player_full_id instance using the specified properties.
     * @param [properties] Properties to set
     * @returns player_to_player_full_id instance
     */
    public static create(properties?: Iplayer_to_player_full_id): player_to_player_full_id;

    /**
     * Encodes the specified player_to_player_full_id message. Does not implicitly {@link player_to_player_full_id.verify|verify} messages.
     * @param message player_to_player_full_id message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iplayer_to_player_full_id, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified player_to_player_full_id message, length delimited. Does not implicitly {@link player_to_player_full_id.verify|verify} messages.
     * @param message player_to_player_full_id message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iplayer_to_player_full_id, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a player_to_player_full_id message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns player_to_player_full_id
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): player_to_player_full_id;

    /**
     * Decodes a player_to_player_full_id message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns player_to_player_full_id
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): player_to_player_full_id;

    /**
     * Verifies a player_to_player_full_id message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a player_to_player_full_id message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns player_to_player_full_id
     */
    public static fromObject(object: { [k: string]: any }): player_to_player_full_id;

    /**
     * Creates a plain object from a player_to_player_full_id message. Also converts values to other types if specified.
     * @param message player_to_player_full_id
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: player_to_player_full_id, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this player_to_player_full_id to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for player_to_player_full_id
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a player_simple. */
export class player_simple implements Iplayer_simple {

    /**
     * Constructs a new player_simple.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iplayer_simple);

    /** player_simple player_full_id. */
    public player_full_id?: (Iplayer_full_id|null);

    /** player_simple nickname. */
    public nickname: string;

    /** player_simple head_id. */
    public head_id: number;

    /** player_simple head_border. */
    public head_border: number;

    /** player_simple figure. */
    public figure: number;

    /** player_simple color. */
    public color: number;

    /** player_simple designation. */
    public designation: number;

    /** player_simple lv. */
    public lv: number;

    /** player_simple vip_lv. */
    public vip_lv: number;

    /** player_simple cur_grade. */
    public cur_grade: number;

    /** player_simple build_list. */
    public build_list: Icommon_key_value2[];

    /** player_simple hero_list. */
    public hero_list: Icommon_key_value[];

    /** player_simple solider_list. */
    public solider_list: Icommon_key_value[];

    /** player_simple special_list. */
    public special_list: Icommon_key_value[];

    /**
     * Creates a new player_simple instance using the specified properties.
     * @param [properties] Properties to set
     * @returns player_simple instance
     */
    public static create(properties?: Iplayer_simple): player_simple;

    /**
     * Encodes the specified player_simple message. Does not implicitly {@link player_simple.verify|verify} messages.
     * @param message player_simple message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iplayer_simple, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified player_simple message, length delimited. Does not implicitly {@link player_simple.verify|verify} messages.
     * @param message player_simple message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iplayer_simple, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a player_simple message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns player_simple
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): player_simple;

    /**
     * Decodes a player_simple message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns player_simple
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): player_simple;

    /**
     * Verifies a player_simple message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a player_simple message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns player_simple
     */
    public static fromObject(object: { [k: string]: any }): player_simple;

    /**
     * Creates a plain object from a player_simple message. Also converts values to other types if specified.
     * @param message player_simple
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: player_simple, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this player_simple to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for player_simple
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a common_key_value. */
export class common_key_value implements Icommon_key_value {

    /**
     * Constructs a new common_key_value.
     * @param [properties] Properties to set
     */
    constructor(properties?: Icommon_key_value);

    /** common_key_value key. */
    public key: number;

    /** common_key_value value. */
    public value: number;

    /**
     * Creates a new common_key_value instance using the specified properties.
     * @param [properties] Properties to set
     * @returns common_key_value instance
     */
    public static create(properties?: Icommon_key_value): common_key_value;

    /**
     * Encodes the specified common_key_value message. Does not implicitly {@link common_key_value.verify|verify} messages.
     * @param message common_key_value message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Icommon_key_value, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified common_key_value message, length delimited. Does not implicitly {@link common_key_value.verify|verify} messages.
     * @param message common_key_value message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Icommon_key_value, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a common_key_value message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns common_key_value
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common_key_value;

    /**
     * Decodes a common_key_value message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns common_key_value
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common_key_value;

    /**
     * Verifies a common_key_value message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a common_key_value message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns common_key_value
     */
    public static fromObject(object: { [k: string]: any }): common_key_value;

    /**
     * Creates a plain object from a common_key_value message. Also converts values to other types if specified.
     * @param message common_key_value
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: common_key_value, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this common_key_value to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for common_key_value
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a common_key_value2. */
export class common_key_value2 implements Icommon_key_value2 {

    /**
     * Constructs a new common_key_value2.
     * @param [properties] Properties to set
     */
    constructor(properties?: Icommon_key_value2);

    /** common_key_value2 key. */
    public key: number;

    /** common_key_value2 value1. */
    public value1: number;

    /** common_key_value2 value2. */
    public value2: number;

    /**
     * Creates a new common_key_value2 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns common_key_value2 instance
     */
    public static create(properties?: Icommon_key_value2): common_key_value2;

    /**
     * Encodes the specified common_key_value2 message. Does not implicitly {@link common_key_value2.verify|verify} messages.
     * @param message common_key_value2 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Icommon_key_value2, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified common_key_value2 message, length delimited. Does not implicitly {@link common_key_value2.verify|verify} messages.
     * @param message common_key_value2 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Icommon_key_value2, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a common_key_value2 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns common_key_value2
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common_key_value2;

    /**
     * Decodes a common_key_value2 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns common_key_value2
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common_key_value2;

    /**
     * Verifies a common_key_value2 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a common_key_value2 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns common_key_value2
     */
    public static fromObject(object: { [k: string]: any }): common_key_value2;

    /**
     * Creates a plain object from a common_key_value2 message. Also converts values to other types if specified.
     * @param message common_key_value2
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: common_key_value2, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this common_key_value2 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for common_key_value2
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a common_keystr_value1. */
export class common_keystr_value1 implements Icommon_keystr_value1 {

    /**
     * Constructs a new common_keystr_value1.
     * @param [properties] Properties to set
     */
    constructor(properties?: Icommon_keystr_value1);

    /** common_keystr_value1 key. */
    public key: string;

    /** common_keystr_value1 value. */
    public value: number;

    /**
     * Creates a new common_keystr_value1 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns common_keystr_value1 instance
     */
    public static create(properties?: Icommon_keystr_value1): common_keystr_value1;

    /**
     * Encodes the specified common_keystr_value1 message. Does not implicitly {@link common_keystr_value1.verify|verify} messages.
     * @param message common_keystr_value1 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Icommon_keystr_value1, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified common_keystr_value1 message, length delimited. Does not implicitly {@link common_keystr_value1.verify|verify} messages.
     * @param message common_keystr_value1 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Icommon_keystr_value1, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a common_keystr_value1 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns common_keystr_value1
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common_keystr_value1;

    /**
     * Decodes a common_keystr_value1 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns common_keystr_value1
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common_keystr_value1;

    /**
     * Verifies a common_keystr_value1 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a common_keystr_value1 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns common_keystr_value1
     */
    public static fromObject(object: { [k: string]: any }): common_keystr_value1;

    /**
     * Creates a plain object from a common_keystr_value1 message. Also converts values to other types if specified.
     * @param message common_keystr_value1
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: common_keystr_value1, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this common_keystr_value1 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for common_keystr_value1
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a common_keystr_value2. */
export class common_keystr_value2 implements Icommon_keystr_value2 {

    /**
     * Constructs a new common_keystr_value2.
     * @param [properties] Properties to set
     */
    constructor(properties?: Icommon_keystr_value2);

    /** common_keystr_value2 key. */
    public key: string;

    /** common_keystr_value2 value1. */
    public value1: number;

    /** common_keystr_value2 value2. */
    public value2: number;

    /**
     * Creates a new common_keystr_value2 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns common_keystr_value2 instance
     */
    public static create(properties?: Icommon_keystr_value2): common_keystr_value2;

    /**
     * Encodes the specified common_keystr_value2 message. Does not implicitly {@link common_keystr_value2.verify|verify} messages.
     * @param message common_keystr_value2 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Icommon_keystr_value2, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified common_keystr_value2 message, length delimited. Does not implicitly {@link common_keystr_value2.verify|verify} messages.
     * @param message common_keystr_value2 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Icommon_keystr_value2, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a common_keystr_value2 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns common_keystr_value2
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): common_keystr_value2;

    /**
     * Decodes a common_keystr_value2 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns common_keystr_value2
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): common_keystr_value2;

    /**
     * Verifies a common_keystr_value2 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a common_keystr_value2 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns common_keystr_value2
     */
    public static fromObject(object: { [k: string]: any }): common_keystr_value2;

    /**
     * Creates a plain object from a common_keystr_value2 message. Also converts values to other types if specified.
     * @param message common_keystr_value2
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: common_keystr_value2, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this common_keystr_value2 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for common_keystr_value2
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an arg_content. */
export class arg_content implements Iarg_content {

    /**
     * Constructs a new arg_content.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iarg_content);

    /** arg_content player_full_id. */
    public player_full_id?: (Iplayer_full_id|null);

    /** arg_content id. */
    public id: number;

    /** arg_content guid. */
    public guid: string;

    /** arg_content content. */
    public content: string;

    /**
     * Creates a new arg_content instance using the specified properties.
     * @param [properties] Properties to set
     * @returns arg_content instance
     */
    public static create(properties?: Iarg_content): arg_content;

    /**
     * Encodes the specified arg_content message. Does not implicitly {@link arg_content.verify|verify} messages.
     * @param message arg_content message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iarg_content, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified arg_content message, length delimited. Does not implicitly {@link arg_content.verify|verify} messages.
     * @param message arg_content message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iarg_content, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an arg_content message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns arg_content
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): arg_content;

    /**
     * Decodes an arg_content message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns arg_content
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): arg_content;

    /**
     * Verifies an arg_content message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an arg_content message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns arg_content
     */
    public static fromObject(object: { [k: string]: any }): arg_content;

    /**
     * Creates a plain object from an arg_content message. Also converts values to other types if specified.
     * @param message arg_content
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: arg_content, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this arg_content to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for arg_content
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a msg_arg. */
export class msg_arg implements Imsg_arg {

    /**
     * Constructs a new msg_arg.
     * @param [properties] Properties to set
     */
    constructor(properties?: Imsg_arg);

    /** msg_arg arg_content_list. */
    public arg_content_list: Iarg_content[];

    /**
     * Creates a new msg_arg instance using the specified properties.
     * @param [properties] Properties to set
     * @returns msg_arg instance
     */
    public static create(properties?: Imsg_arg): msg_arg;

    /**
     * Encodes the specified msg_arg message. Does not implicitly {@link msg_arg.verify|verify} messages.
     * @param message msg_arg message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Imsg_arg, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified msg_arg message, length delimited. Does not implicitly {@link msg_arg.verify|verify} messages.
     * @param message msg_arg message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Imsg_arg, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a msg_arg message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns msg_arg
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg_arg;

    /**
     * Decodes a msg_arg message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns msg_arg
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg_arg;

    /**
     * Verifies a msg_arg message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a msg_arg message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns msg_arg
     */
    public static fromObject(object: { [k: string]: any }): msg_arg;

    /**
     * Creates a plain object from a msg_arg message. Also converts values to other types if specified.
     * @param message msg_arg
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: msg_arg, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this msg_arg to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for msg_arg
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a msg. */
export class msg implements Imsg {

    /**
     * Constructs a new msg.
     * @param [properties] Properties to set
     */
    constructor(properties?: Imsg);

    /** msg type. */
    public type: number;

    /** msg time. */
    public time: number;

    /** msg player. */
    public player?: (Iother_player|null);

    /** msg content. */
    public content: string;

    /** msg msg_id. */
    public msg_id: number;

    /** msg msg_arg_list. */
    public msg_arg_list: Imsg_arg[];

    /**
     * Creates a new msg instance using the specified properties.
     * @param [properties] Properties to set
     * @returns msg instance
     */
    public static create(properties?: Imsg): msg;

    /**
     * Encodes the specified msg message. Does not implicitly {@link msg.verify|verify} messages.
     * @param message msg message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Imsg, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified msg message, length delimited. Does not implicitly {@link msg.verify|verify} messages.
     * @param message msg message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Imsg, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a msg message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns msg
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): msg;

    /**
     * Decodes a msg message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns msg
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): msg;

    /**
     * Verifies a msg message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a msg message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns msg
     */
    public static fromObject(object: { [k: string]: any }): msg;

    /**
     * Creates a plain object from a msg message. Also converts values to other types if specified.
     * @param message msg
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: msg, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this msg to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for msg
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a chat. */
export class chat implements Ichat {

    /**
     * Constructs a new chat.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ichat);

    /** chat channel. */
    public channel: number;

    /** chat msg_list. */
    public msg_list: Imsg[];

    /**
     * Creates a new chat instance using the specified properties.
     * @param [properties] Properties to set
     * @returns chat instance
     */
    public static create(properties?: Ichat): chat;

    /**
     * Encodes the specified chat message. Does not implicitly {@link chat.verify|verify} messages.
     * @param message chat message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ichat, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified chat message, length delimited. Does not implicitly {@link chat.verify|verify} messages.
     * @param message chat message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ichat, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a chat message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns chat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat;

    /**
     * Decodes a chat message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns chat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat;

    /**
     * Verifies a chat message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a chat message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns chat
     */
    public static fromObject(object: { [k: string]: any }): chat;

    /**
     * Creates a plain object from a chat message. Also converts values to other types if specified.
     * @param message chat
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: chat, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this chat to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for chat
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_400. */
export class query_400 implements Iquery_400 {

    /**
     * Constructs a new query_400.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_400);

    /**
     * Creates a new query_400 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_400 instance
     */
    public static create(properties?: Iquery_400): query_400;

    /**
     * Encodes the specified query_400 message. Does not implicitly {@link query_400.verify|verify} messages.
     * @param message query_400 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_400, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_400 message, length delimited. Does not implicitly {@link query_400.verify|verify} messages.
     * @param message query_400 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_400, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_400 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_400
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_400;

    /**
     * Decodes a query_400 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_400
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_400;

    /**
     * Verifies a query_400 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_400 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_400
     */
    public static fromObject(object: { [k: string]: any }): query_400;

    /**
     * Creates a plain object from a query_400 message. Also converts values to other types if specified.
     * @param message query_400
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_400, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_400 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_400
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_400. */
export class reply_400 implements Ireply_400 {

    /**
     * Constructs a new reply_400.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_400);

    /** reply_400 chat_list. */
    public chat_list: Ichat[];

    /** reply_400 friend_list. */
    public friend_list: Ifriend[];

    /**
     * Creates a new reply_400 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_400 instance
     */
    public static create(properties?: Ireply_400): reply_400;

    /**
     * Encodes the specified reply_400 message. Does not implicitly {@link reply_400.verify|verify} messages.
     * @param message reply_400 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_400, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_400 message, length delimited. Does not implicitly {@link reply_400.verify|verify} messages.
     * @param message reply_400 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_400, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_400 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_400
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_400;

    /**
     * Decodes a reply_400 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_400
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_400;

    /**
     * Verifies a reply_400 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_400 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_400
     */
    public static fromObject(object: { [k: string]: any }): reply_400;

    /**
     * Creates a plain object from a reply_400 message. Also converts values to other types if specified.
     * @param message reply_400
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_400, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_400 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_400
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_401. */
export class reply_401 implements Ireply_401 {

    /**
     * Constructs a new reply_401.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_401);

    /** reply_401 chat. */
    public chat?: (Ichat|null);

    /**
     * Creates a new reply_401 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_401 instance
     */
    public static create(properties?: Ireply_401): reply_401;

    /**
     * Encodes the specified reply_401 message. Does not implicitly {@link reply_401.verify|verify} messages.
     * @param message reply_401 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_401, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_401 message, length delimited. Does not implicitly {@link reply_401.verify|verify} messages.
     * @param message reply_401 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_401, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_401 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_401
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_401;

    /**
     * Decodes a reply_401 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_401
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_401;

    /**
     * Verifies a reply_401 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_401 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_401
     */
    public static fromObject(object: { [k: string]: any }): reply_401;

    /**
     * Creates a plain object from a reply_401 message. Also converts values to other types if specified.
     * @param message reply_401
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_401, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_401 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_401
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_402. */
export class query_402 implements Iquery_402 {

    /**
     * Constructs a new query_402.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_402);

    /** query_402 channel. */
    public channel: number;

    /** query_402 content. */
    public content: string;

    /**
     * Creates a new query_402 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_402 instance
     */
    public static create(properties?: Iquery_402): query_402;

    /**
     * Encodes the specified query_402 message. Does not implicitly {@link query_402.verify|verify} messages.
     * @param message query_402 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_402, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_402 message, length delimited. Does not implicitly {@link query_402.verify|verify} messages.
     * @param message query_402 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_402, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_402 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_402
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_402;

    /**
     * Decodes a query_402 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_402
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_402;

    /**
     * Verifies a query_402 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_402 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_402
     */
    public static fromObject(object: { [k: string]: any }): query_402;

    /**
     * Creates a plain object from a query_402 message. Also converts values to other types if specified.
     * @param message query_402
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_402, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_402 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_402
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_402. */
export class reply_402 implements Ireply_402 {

    /**
     * Constructs a new reply_402.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_402);

    /** reply_402 status. */
    public status: number;

    /** reply_402 message. */
    public message: string;

    /**
     * Creates a new reply_402 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_402 instance
     */
    public static create(properties?: Ireply_402): reply_402;

    /**
     * Encodes the specified reply_402 message. Does not implicitly {@link reply_402.verify|verify} messages.
     * @param message reply_402 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_402, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_402 message, length delimited. Does not implicitly {@link reply_402.verify|verify} messages.
     * @param message reply_402 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_402, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_402 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_402
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_402;

    /**
     * Decodes a reply_402 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_402
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_402;

    /**
     * Verifies a reply_402 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_402 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_402
     */
    public static fromObject(object: { [k: string]: any }): reply_402;

    /**
     * Creates a plain object from a reply_402 message. Also converts values to other types if specified.
     * @param message reply_402
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_402, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_402 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_402
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_405. */
export class query_405 implements Iquery_405 {

    /**
     * Constructs a new query_405.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_405);

    /** query_405 channel_world_hidden. */
    public channel_world_hidden: number;

    /** query_405 channel_cross_hidden. */
    public channel_cross_hidden: number;

    /** query_405 channel_guild_hidden. */
    public channel_guild_hidden: number;

    /** query_405 channel_system_hidden. */
    public channel_system_hidden: number;

    /**
     * Creates a new query_405 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_405 instance
     */
    public static create(properties?: Iquery_405): query_405;

    /**
     * Encodes the specified query_405 message. Does not implicitly {@link query_405.verify|verify} messages.
     * @param message query_405 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_405, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_405 message, length delimited. Does not implicitly {@link query_405.verify|verify} messages.
     * @param message query_405 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_405, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_405 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_405
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_405;

    /**
     * Decodes a query_405 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_405
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_405;

    /**
     * Verifies a query_405 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_405 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_405
     */
    public static fromObject(object: { [k: string]: any }): query_405;

    /**
     * Creates a plain object from a query_405 message. Also converts values to other types if specified.
     * @param message query_405
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_405, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_405 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_405
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_405. */
export class reply_405 implements Ireply_405 {

    /**
     * Constructs a new reply_405.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_405);

    /** reply_405 status. */
    public status: number;

    /** reply_405 message. */
    public message: string;

    /** reply_405 channel_world_hidden. */
    public channel_world_hidden: number;

    /** reply_405 channel_cross_hidden. */
    public channel_cross_hidden: number;

    /** reply_405 channel_guild_hidden. */
    public channel_guild_hidden: number;

    /** reply_405 channel_system_hidden. */
    public channel_system_hidden: number;

    /**
     * Creates a new reply_405 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_405 instance
     */
    public static create(properties?: Ireply_405): reply_405;

    /**
     * Encodes the specified reply_405 message. Does not implicitly {@link reply_405.verify|verify} messages.
     * @param message reply_405 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_405, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_405 message, length delimited. Does not implicitly {@link reply_405.verify|verify} messages.
     * @param message reply_405 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_405, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_405 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_405
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_405;

    /**
     * Decodes a reply_405 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_405
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_405;

    /**
     * Verifies a reply_405 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_405 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_405
     */
    public static fromObject(object: { [k: string]: any }): reply_405;

    /**
     * Creates a plain object from a reply_405 message. Also converts values to other types if specified.
     * @param message reply_405
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_405, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_405 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_405
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a private_chat. */
export class private_chat implements Iprivate_chat {

    /**
     * Constructs a new private_chat.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iprivate_chat);

    /** private_chat full_id. */
    public full_id?: (Iplayer_full_id|null);

    /** private_chat chat_friend_list. */
    public chat_friend_list: Ichat_friend[];

    /**
     * Creates a new private_chat instance using the specified properties.
     * @param [properties] Properties to set
     * @returns private_chat instance
     */
    public static create(properties?: Iprivate_chat): private_chat;

    /**
     * Encodes the specified private_chat message. Does not implicitly {@link private_chat.verify|verify} messages.
     * @param message private_chat message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iprivate_chat, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified private_chat message, length delimited. Does not implicitly {@link private_chat.verify|verify} messages.
     * @param message private_chat message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iprivate_chat, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a private_chat message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns private_chat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): private_chat;

    /**
     * Decodes a private_chat message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns private_chat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): private_chat;

    /**
     * Verifies a private_chat message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a private_chat message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns private_chat
     */
    public static fromObject(object: { [k: string]: any }): private_chat;

    /**
     * Creates a plain object from a private_chat message. Also converts values to other types if specified.
     * @param message private_chat
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: private_chat, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this private_chat to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for private_chat
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a chat_friend. */
export class chat_friend implements Ichat_friend {

    /**
     * Constructs a new chat_friend.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ichat_friend);

    /** chat_friend full_id. */
    public full_id?: (Iplayer_full_id|null);

    /** chat_friend other_player. */
    public other_player?: (Iother_player|null);

    /** chat_friend chat_end_time. */
    public chat_end_time: number;

    /**
     * Creates a new chat_friend instance using the specified properties.
     * @param [properties] Properties to set
     * @returns chat_friend instance
     */
    public static create(properties?: Ichat_friend): chat_friend;

    /**
     * Encodes the specified chat_friend message. Does not implicitly {@link chat_friend.verify|verify} messages.
     * @param message chat_friend message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ichat_friend, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified chat_friend message, length delimited. Does not implicitly {@link chat_friend.verify|verify} messages.
     * @param message chat_friend message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ichat_friend, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a chat_friend message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns chat_friend
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat_friend;

    /**
     * Decodes a chat_friend message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns chat_friend
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat_friend;

    /**
     * Verifies a chat_friend message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a chat_friend message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns chat_friend
     */
    public static fromObject(object: { [k: string]: any }): chat_friend;

    /**
     * Creates a plain object from a chat_friend message. Also converts values to other types if specified.
     * @param message chat_friend
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: chat_friend, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this chat_friend to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for chat_friend
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_406. */
export class query_406 implements Iquery_406 {

    /**
     * Constructs a new query_406.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_406);

    /**
     * Creates a new query_406 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_406 instance
     */
    public static create(properties?: Iquery_406): query_406;

    /**
     * Encodes the specified query_406 message. Does not implicitly {@link query_406.verify|verify} messages.
     * @param message query_406 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_406, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_406 message, length delimited. Does not implicitly {@link query_406.verify|verify} messages.
     * @param message query_406 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_406, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_406 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_406
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_406;

    /**
     * Decodes a query_406 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_406
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_406;

    /**
     * Verifies a query_406 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_406 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_406
     */
    public static fromObject(object: { [k: string]: any }): query_406;

    /**
     * Creates a plain object from a query_406 message. Also converts values to other types if specified.
     * @param message query_406
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_406, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_406 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_406
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_406. */
export class reply_406 implements Ireply_406 {

    /**
     * Constructs a new reply_406.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_406);

    /** reply_406 status. */
    public status: number;

    /** reply_406 message. */
    public message: string;

    /** reply_406 chat_friend_list. */
    public chat_friend_list: Ichat_friend[];

    /**
     * Creates a new reply_406 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_406 instance
     */
    public static create(properties?: Ireply_406): reply_406;

    /**
     * Encodes the specified reply_406 message. Does not implicitly {@link reply_406.verify|verify} messages.
     * @param message reply_406 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_406, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_406 message, length delimited. Does not implicitly {@link reply_406.verify|verify} messages.
     * @param message reply_406 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_406, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_406 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_406
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_406;

    /**
     * Decodes a reply_406 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_406
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_406;

    /**
     * Verifies a reply_406 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_406 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_406
     */
    public static fromObject(object: { [k: string]: any }): reply_406;

    /**
     * Creates a plain object from a reply_406 message. Also converts values to other types if specified.
     * @param message reply_406
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_406, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_406 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_406
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_407. */
export class query_407 implements Iquery_407 {

    /**
     * Constructs a new query_407.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_407);

    /** query_407 channel. */
    public channel: number;

    /** query_407 content. */
    public content: string;

    /** query_407 player_full_id. */
    public player_full_id?: (Iplayer_full_id|null);

    /**
     * Creates a new query_407 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_407 instance
     */
    public static create(properties?: Iquery_407): query_407;

    /**
     * Encodes the specified query_407 message. Does not implicitly {@link query_407.verify|verify} messages.
     * @param message query_407 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_407, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_407 message, length delimited. Does not implicitly {@link query_407.verify|verify} messages.
     * @param message query_407 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_407, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_407 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_407
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_407;

    /**
     * Decodes a query_407 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_407
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_407;

    /**
     * Verifies a query_407 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_407 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_407
     */
    public static fromObject(object: { [k: string]: any }): query_407;

    /**
     * Creates a plain object from a query_407 message. Also converts values to other types if specified.
     * @param message query_407
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_407, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_407 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_407
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_407. */
export class reply_407 implements Ireply_407 {

    /**
     * Constructs a new reply_407.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_407);

    /** reply_407 status. */
    public status: number;

    /** reply_407 message. */
    public message: string;

    /**
     * Creates a new reply_407 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_407 instance
     */
    public static create(properties?: Ireply_407): reply_407;

    /**
     * Encodes the specified reply_407 message. Does not implicitly {@link reply_407.verify|verify} messages.
     * @param message reply_407 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_407, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_407 message, length delimited. Does not implicitly {@link reply_407.verify|verify} messages.
     * @param message reply_407 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_407, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_407 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_407
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_407;

    /**
     * Decodes a reply_407 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_407
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_407;

    /**
     * Verifies a reply_407 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_407 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_407
     */
    public static fromObject(object: { [k: string]: any }): reply_407;

    /**
     * Creates a plain object from a reply_407 message. Also converts values to other types if specified.
     * @param message reply_407
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_407, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_407 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_407
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_408. */
export class query_408 implements Iquery_408 {

    /**
     * Constructs a new query_408.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_408);

    /** query_408 full_id. */
    public full_id?: (Iplayer_full_id|null);

    /**
     * Creates a new query_408 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_408 instance
     */
    public static create(properties?: Iquery_408): query_408;

    /**
     * Encodes the specified query_408 message. Does not implicitly {@link query_408.verify|verify} messages.
     * @param message query_408 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_408, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_408 message, length delimited. Does not implicitly {@link query_408.verify|verify} messages.
     * @param message query_408 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_408, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_408 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_408
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_408;

    /**
     * Decodes a query_408 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_408
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_408;

    /**
     * Verifies a query_408 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_408 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_408
     */
    public static fromObject(object: { [k: string]: any }): query_408;

    /**
     * Creates a plain object from a query_408 message. Also converts values to other types if specified.
     * @param message query_408
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_408, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_408 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_408
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_408. */
export class reply_408 implements Ireply_408 {

    /**
     * Constructs a new reply_408.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_408);

    /** reply_408 status. */
    public status: number;

    /** reply_408 message. */
    public message: string;

    /** reply_408 chat_list. */
    public chat_list: Ichat[];

    /**
     * Creates a new reply_408 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_408 instance
     */
    public static create(properties?: Ireply_408): reply_408;

    /**
     * Encodes the specified reply_408 message. Does not implicitly {@link reply_408.verify|verify} messages.
     * @param message reply_408 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_408, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_408 message, length delimited. Does not implicitly {@link reply_408.verify|verify} messages.
     * @param message reply_408 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_408, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_408 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_408
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_408;

    /**
     * Decodes a reply_408 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_408
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_408;

    /**
     * Verifies a reply_408 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_408 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_408
     */
    public static fromObject(object: { [k: string]: any }): reply_408;

    /**
     * Creates a plain object from a reply_408 message. Also converts values to other types if specified.
     * @param message reply_408
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_408, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_408 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_408
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_409. */
export class query_409 implements Iquery_409 {

    /**
     * Constructs a new query_409.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_409);

    /** query_409 full_id. */
    public full_id?: (Iplayer_full_id|null);

    /** query_409 query_type. */
    public query_type: number;

    /**
     * Creates a new query_409 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_409 instance
     */
    public static create(properties?: Iquery_409): query_409;

    /**
     * Encodes the specified query_409 message. Does not implicitly {@link query_409.verify|verify} messages.
     * @param message query_409 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_409, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_409 message, length delimited. Does not implicitly {@link query_409.verify|verify} messages.
     * @param message query_409 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_409, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_409 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_409
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_409;

    /**
     * Decodes a query_409 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_409
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_409;

    /**
     * Verifies a query_409 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_409 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_409
     */
    public static fromObject(object: { [k: string]: any }): query_409;

    /**
     * Creates a plain object from a query_409 message. Also converts values to other types if specified.
     * @param message query_409
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_409, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_409 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_409
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_409. */
export class reply_409 implements Ireply_409 {

    /**
     * Constructs a new reply_409.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_409);

    /** reply_409 status. */
    public status: number;

    /** reply_409 message. */
    public message: string;

    /** reply_409 chat_friend_list. */
    public chat_friend_list: Ichat_friend[];

    /**
     * Creates a new reply_409 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_409 instance
     */
    public static create(properties?: Ireply_409): reply_409;

    /**
     * Encodes the specified reply_409 message. Does not implicitly {@link reply_409.verify|verify} messages.
     * @param message reply_409 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_409, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_409 message, length delimited. Does not implicitly {@link reply_409.verify|verify} messages.
     * @param message reply_409 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_409, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_409 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_409
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_409;

    /**
     * Decodes a reply_409 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_409
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_409;

    /**
     * Verifies a reply_409 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_409 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_409
     */
    public static fromObject(object: { [k: string]: any }): reply_409;

    /**
     * Creates a plain object from a reply_409 message. Also converts values to other types if specified.
     * @param message reply_409
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_409, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_409 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_409
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_410. */
export class query_410 implements Iquery_410 {

    /**
     * Constructs a new query_410.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_410);

    /** query_410 full_id. */
    public full_id?: (Iplayer_full_id|null);

    /**
     * Creates a new query_410 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_410 instance
     */
    public static create(properties?: Iquery_410): query_410;

    /**
     * Encodes the specified query_410 message. Does not implicitly {@link query_410.verify|verify} messages.
     * @param message query_410 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_410, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_410 message, length delimited. Does not implicitly {@link query_410.verify|verify} messages.
     * @param message query_410 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_410, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_410 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_410
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_410;

    /**
     * Decodes a query_410 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_410
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_410;

    /**
     * Verifies a query_410 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_410 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_410
     */
    public static fromObject(object: { [k: string]: any }): query_410;

    /**
     * Creates a plain object from a query_410 message. Also converts values to other types if specified.
     * @param message query_410
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_410, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_410 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_410
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_410. */
export class reply_410 implements Ireply_410 {

    /**
     * Constructs a new reply_410.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_410);

    /** reply_410 status. */
    public status: number;

    /** reply_410 message. */
    public message: string;

    /**
     * Creates a new reply_410 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_410 instance
     */
    public static create(properties?: Ireply_410): reply_410;

    /**
     * Encodes the specified reply_410 message. Does not implicitly {@link reply_410.verify|verify} messages.
     * @param message reply_410 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_410, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_410 message, length delimited. Does not implicitly {@link reply_410.verify|verify} messages.
     * @param message reply_410 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_410, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_410 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_410
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_410;

    /**
     * Decodes a reply_410 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_410
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_410;

    /**
     * Verifies a reply_410 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_410 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_410
     */
    public static fromObject(object: { [k: string]: any }): reply_410;

    /**
     * Creates a plain object from a reply_410 message. Also converts values to other types if specified.
     * @param message reply_410
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_410, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_410 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_410
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a red_pack_info. */
export class red_pack_info implements Ired_pack_info {

    /**
     * Constructs a new red_pack_info.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ired_pack_info);

    /** red_pack_info red_pack_guid. */
    public red_pack_guid: string;

    /** red_pack_info red_pack_id. */
    public red_pack_id: number;

    /** red_pack_info remain_reward. */
    public remain_reward: Icommon_key_value[];

    /** red_pack_info expiration_time. */
    public expiration_time: number;

    /** red_pack_info player_reward_list. */
    public player_reward_list: Iplayer_reward[];

    /**
     * Creates a new red_pack_info instance using the specified properties.
     * @param [properties] Properties to set
     * @returns red_pack_info instance
     */
    public static create(properties?: Ired_pack_info): red_pack_info;

    /**
     * Encodes the specified red_pack_info message. Does not implicitly {@link red_pack_info.verify|verify} messages.
     * @param message red_pack_info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ired_pack_info, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified red_pack_info message, length delimited. Does not implicitly {@link red_pack_info.verify|verify} messages.
     * @param message red_pack_info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ired_pack_info, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a red_pack_info message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns red_pack_info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): red_pack_info;

    /**
     * Decodes a red_pack_info message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns red_pack_info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): red_pack_info;

    /**
     * Verifies a red_pack_info message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a red_pack_info message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns red_pack_info
     */
    public static fromObject(object: { [k: string]: any }): red_pack_info;

    /**
     * Creates a plain object from a red_pack_info message. Also converts values to other types if specified.
     * @param message red_pack_info
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: red_pack_info, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this red_pack_info to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for red_pack_info
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a player_reward. */
export class player_reward implements Iplayer_reward {

    /**
     * Constructs a new player_reward.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iplayer_reward);

    /** player_reward other_player. */
    public other_player?: (Iother_player|null);

    /** player_reward gain_time. */
    public gain_time: number;

    /** player_reward gain_reward. */
    public gain_reward?: (Icommon_key_value|null);

    /** player_reward full_id. */
    public full_id?: (Iplayer_full_id|null);

    /**
     * Creates a new player_reward instance using the specified properties.
     * @param [properties] Properties to set
     * @returns player_reward instance
     */
    public static create(properties?: Iplayer_reward): player_reward;

    /**
     * Encodes the specified player_reward message. Does not implicitly {@link player_reward.verify|verify} messages.
     * @param message player_reward message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iplayer_reward, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified player_reward message, length delimited. Does not implicitly {@link player_reward.verify|verify} messages.
     * @param message player_reward message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iplayer_reward, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a player_reward message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns player_reward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): player_reward;

    /**
     * Decodes a player_reward message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns player_reward
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): player_reward;

    /**
     * Verifies a player_reward message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a player_reward message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns player_reward
     */
    public static fromObject(object: { [k: string]: any }): player_reward;

    /**
     * Creates a plain object from a player_reward message. Also converts values to other types if specified.
     * @param message player_reward
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: player_reward, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this player_reward to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for player_reward
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reward_record. */
export class reward_record implements Ireward_record {

    /**
     * Constructs a new reward_record.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireward_record);

    /** reward_record reward. */
    public reward?: (Icommon_key_value|null);

    /** reward_record gain_time. */
    public gain_time: number;

    /**
     * Creates a new reward_record instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reward_record instance
     */
    public static create(properties?: Ireward_record): reward_record;

    /**
     * Encodes the specified reward_record message. Does not implicitly {@link reward_record.verify|verify} messages.
     * @param message reward_record message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireward_record, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reward_record message, length delimited. Does not implicitly {@link reward_record.verify|verify} messages.
     * @param message reward_record message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireward_record, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reward_record message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reward_record
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reward_record;

    /**
     * Decodes a reward_record message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reward_record
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reward_record;

    /**
     * Verifies a reward_record message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reward_record message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reward_record
     */
    public static fromObject(object: { [k: string]: any }): reward_record;

    /**
     * Creates a plain object from a reward_record message. Also converts values to other types if specified.
     * @param message reward_record
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reward_record, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reward_record to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reward_record
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a red_pack_data. */
export class red_pack_data implements Ired_pack_data {

    /**
     * Constructs a new red_pack_data.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ired_pack_data);

    /** red_pack_data version. */
    public version: number;

    /** red_pack_data red_pack_guid_list. */
    public red_pack_guid_list: string[];

    /** red_pack_data reward_record_list. */
    public reward_record_list: Ireward_record[];

    /** red_pack_data red_pack_num. */
    public red_pack_num: number;

    /** red_pack_data refresh_time. */
    public refresh_time: number;

    /**
     * Creates a new red_pack_data instance using the specified properties.
     * @param [properties] Properties to set
     * @returns red_pack_data instance
     */
    public static create(properties?: Ired_pack_data): red_pack_data;

    /**
     * Encodes the specified red_pack_data message. Does not implicitly {@link red_pack_data.verify|verify} messages.
     * @param message red_pack_data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ired_pack_data, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified red_pack_data message, length delimited. Does not implicitly {@link red_pack_data.verify|verify} messages.
     * @param message red_pack_data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ired_pack_data, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a red_pack_data message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns red_pack_data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): red_pack_data;

    /**
     * Decodes a red_pack_data message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns red_pack_data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): red_pack_data;

    /**
     * Verifies a red_pack_data message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a red_pack_data message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns red_pack_data
     */
    public static fromObject(object: { [k: string]: any }): red_pack_data;

    /**
     * Creates a plain object from a red_pack_data message. Also converts values to other types if specified.
     * @param message red_pack_data
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: red_pack_data, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this red_pack_data to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for red_pack_data
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_411. */
export class query_411 implements Iquery_411 {

    /**
     * Constructs a new query_411.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_411);

    /** query_411 guid. */
    public guid: string;

    /** query_411 operate_type. */
    public operate_type: number;

    /**
     * Creates a new query_411 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_411 instance
     */
    public static create(properties?: Iquery_411): query_411;

    /**
     * Encodes the specified query_411 message. Does not implicitly {@link query_411.verify|verify} messages.
     * @param message query_411 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_411, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_411 message, length delimited. Does not implicitly {@link query_411.verify|verify} messages.
     * @param message query_411 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_411, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_411 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_411
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_411;

    /**
     * Decodes a query_411 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_411
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_411;

    /**
     * Verifies a query_411 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_411 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_411
     */
    public static fromObject(object: { [k: string]: any }): query_411;

    /**
     * Creates a plain object from a query_411 message. Also converts values to other types if specified.
     * @param message query_411
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_411, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_411 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_411
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_411. */
export class reply_411 implements Ireply_411 {

    /**
     * Constructs a new reply_411.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_411);

    /** reply_411 status. */
    public status: number;

    /** reply_411 message. */
    public message: string;

    /** reply_411 player_reward_list. */
    public player_reward_list: Iplayer_reward[];

    /** reply_411 remain_reward. */
    public remain_reward: Icommon_key_value[];

    /** reply_411 red_pack_guid. */
    public red_pack_guid: string;

    /** reply_411 red_pack_id. */
    public red_pack_id: number;

    /**
     * Creates a new reply_411 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_411 instance
     */
    public static create(properties?: Ireply_411): reply_411;

    /**
     * Encodes the specified reply_411 message. Does not implicitly {@link reply_411.verify|verify} messages.
     * @param message reply_411 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_411, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_411 message, length delimited. Does not implicitly {@link reply_411.verify|verify} messages.
     * @param message reply_411 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_411, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_411 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_411
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_411;

    /**
     * Decodes a reply_411 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_411
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_411;

    /**
     * Verifies a reply_411 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_411 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_411
     */
    public static fromObject(object: { [k: string]: any }): reply_411;

    /**
     * Creates a plain object from a reply_411 message. Also converts values to other types if specified.
     * @param message reply_411
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_411, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_411 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_411
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_412. */
export class query_412 implements Iquery_412 {

    /**
     * Constructs a new query_412.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_412);

    /**
     * Creates a new query_412 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_412 instance
     */
    public static create(properties?: Iquery_412): query_412;

    /**
     * Encodes the specified query_412 message. Does not implicitly {@link query_412.verify|verify} messages.
     * @param message query_412 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_412, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_412 message, length delimited. Does not implicitly {@link query_412.verify|verify} messages.
     * @param message query_412 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_412, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_412 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_412
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_412;

    /**
     * Decodes a query_412 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_412
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_412;

    /**
     * Verifies a query_412 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_412 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_412
     */
    public static fromObject(object: { [k: string]: any }): query_412;

    /**
     * Creates a plain object from a query_412 message. Also converts values to other types if specified.
     * @param message query_412
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_412, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_412 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_412
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_412. */
export class reply_412 implements Ireply_412 {

    /**
     * Constructs a new reply_412.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_412);

    /** reply_412 status. */
    public status: number;

    /** reply_412 message. */
    public message: string;

    /** reply_412 reward_record_list. */
    public reward_record_list: Ireward_record[];

    /**
     * Creates a new reply_412 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_412 instance
     */
    public static create(properties?: Ireply_412): reply_412;

    /**
     * Encodes the specified reply_412 message. Does not implicitly {@link reply_412.verify|verify} messages.
     * @param message reply_412 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_412, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_412 message, length delimited. Does not implicitly {@link reply_412.verify|verify} messages.
     * @param message reply_412 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_412, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_412 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_412
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_412;

    /**
     * Decodes a reply_412 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_412
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_412;

    /**
     * Verifies a reply_412 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_412 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_412
     */
    public static fromObject(object: { [k: string]: any }): reply_412;

    /**
     * Creates a plain object from a reply_412 message. Also converts values to other types if specified.
     * @param message reply_412
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_412, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_412 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_412
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_413. */
export class query_413 implements Iquery_413 {

    /**
     * Constructs a new query_413.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_413);

    /**
     * Creates a new query_413 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_413 instance
     */
    public static create(properties?: Iquery_413): query_413;

    /**
     * Encodes the specified query_413 message. Does not implicitly {@link query_413.verify|verify} messages.
     * @param message query_413 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_413, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_413 message, length delimited. Does not implicitly {@link query_413.verify|verify} messages.
     * @param message query_413 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_413, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_413 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_413
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_413;

    /**
     * Decodes a query_413 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_413
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_413;

    /**
     * Verifies a query_413 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_413 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_413
     */
    public static fromObject(object: { [k: string]: any }): query_413;

    /**
     * Creates a plain object from a query_413 message. Also converts values to other types if specified.
     * @param message query_413
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_413, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_413 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_413
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_413. */
export class reply_413 implements Ireply_413 {

    /**
     * Constructs a new reply_413.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_413);

    /** reply_413 status. */
    public status: number;

    /** reply_413 message. */
    public message: string;

    /** reply_413 red_pack_guid_list. */
    public red_pack_guid_list: string[];

    /**
     * Creates a new reply_413 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_413 instance
     */
    public static create(properties?: Ireply_413): reply_413;

    /**
     * Encodes the specified reply_413 message. Does not implicitly {@link reply_413.verify|verify} messages.
     * @param message reply_413 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_413, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_413 message, length delimited. Does not implicitly {@link reply_413.verify|verify} messages.
     * @param message reply_413 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_413, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_413 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_413
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_413;

    /**
     * Decodes a reply_413 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_413
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_413;

    /**
     * Verifies a reply_413 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_413 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_413
     */
    public static fromObject(object: { [k: string]: any }): reply_413;

    /**
     * Creates a plain object from a reply_413 message. Also converts values to other types if specified.
     * @param message reply_413
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_413, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_413 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_413
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a friend. */
export class friend implements Ifriend {

    /**
     * Constructs a new friend.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ifriend);

    /** friend version. */
    public version: number;

    /** friend other_player_full_id. */
    public other_player_full_id?: (Iplayer_full_id|null);

    /** friend other_player. */
    public other_player?: (Iother_player|null);

    /**
     * Creates a new friend instance using the specified properties.
     * @param [properties] Properties to set
     * @returns friend instance
     */
    public static create(properties?: Ifriend): friend;

    /**
     * Encodes the specified friend message. Does not implicitly {@link friend.verify|verify} messages.
     * @param message friend message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ifriend, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified friend message, length delimited. Does not implicitly {@link friend.verify|verify} messages.
     * @param message friend message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ifriend, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a friend message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns friend
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): friend;

    /**
     * Decodes a friend message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns friend
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): friend;

    /**
     * Verifies a friend message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a friend message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns friend
     */
    public static fromObject(object: { [k: string]: any }): friend;

    /**
     * Creates a plain object from a friend message. Also converts values to other types if specified.
     * @param message friend
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: friend, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this friend to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for friend
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a relation. */
export class relation implements Irelation {

    /**
     * Constructs a new relation.
     * @param [properties] Properties to set
     */
    constructor(properties?: Irelation);

    /** relation version. */
    public version: number;

    /** relation self_full_id. */
    public self_full_id?: (Iplayer_full_id|null);

    /** relation other_player_full_id. */
    public other_player_full_id?: (Iplayer_full_id|null);

    /** relation is_friend. */
    public is_friend: number;

    /** relation apply_time. */
    public apply_time: number;

    /** relation like_from_time. */
    public like_from_time: number;

    /** relation other_player. */
    public other_player?: (Iother_player|null);

    /**
     * Creates a new relation instance using the specified properties.
     * @param [properties] Properties to set
     * @returns relation instance
     */
    public static create(properties?: Irelation): relation;

    /**
     * Encodes the specified relation message. Does not implicitly {@link relation.verify|verify} messages.
     * @param message relation message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Irelation, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified relation message, length delimited. Does not implicitly {@link relation.verify|verify} messages.
     * @param message relation message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Irelation, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a relation message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns relation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): relation;

    /**
     * Decodes a relation message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns relation
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): relation;

    /**
     * Verifies a relation message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a relation message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns relation
     */
    public static fromObject(object: { [k: string]: any }): relation;

    /**
     * Creates a plain object from a relation message. Also converts values to other types if specified.
     * @param message relation
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: relation, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this relation to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for relation
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_300. */
export class query_300 implements Iquery_300 {

    /**
     * Constructs a new query_300.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_300);

    /**
     * Creates a new query_300 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_300 instance
     */
    public static create(properties?: Iquery_300): query_300;

    /**
     * Encodes the specified query_300 message. Does not implicitly {@link query_300.verify|verify} messages.
     * @param message query_300 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_300, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_300 message, length delimited. Does not implicitly {@link query_300.verify|verify} messages.
     * @param message query_300 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_300, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_300 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_300
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_300;

    /**
     * Decodes a query_300 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_300
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_300;

    /**
     * Verifies a query_300 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_300 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_300
     */
    public static fromObject(object: { [k: string]: any }): query_300;

    /**
     * Creates a plain object from a query_300 message. Also converts values to other types if specified.
     * @param message query_300
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_300, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_300 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_300
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_300. */
export class reply_300 implements Ireply_300 {

    /**
     * Constructs a new reply_300.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_300);

    /** reply_300 friend_list. */
    public friend_list: Ifriend[];

    /** reply_300 left_like_to_num. */
    public left_like_to_num: number;

    /** reply_300 left_like_received_num. */
    public left_like_received_num: number;

    /**
     * Creates a new reply_300 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_300 instance
     */
    public static create(properties?: Ireply_300): reply_300;

    /**
     * Encodes the specified reply_300 message. Does not implicitly {@link reply_300.verify|verify} messages.
     * @param message reply_300 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_300, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_300 message, length delimited. Does not implicitly {@link reply_300.verify|verify} messages.
     * @param message reply_300 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_300, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_300 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_300
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_300;

    /**
     * Decodes a reply_300 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_300
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_300;

    /**
     * Verifies a reply_300 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_300 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_300
     */
    public static fromObject(object: { [k: string]: any }): reply_300;

    /**
     * Creates a plain object from a reply_300 message. Also converts values to other types if specified.
     * @param message reply_300
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_300, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_300 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_300
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_304. */
export class query_304 implements Iquery_304 {

    /**
     * Constructs a new query_304.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_304);

    /** query_304 player_full_id. */
    public player_full_id?: (Iplayer_full_id|null);

    /**
     * Creates a new query_304 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_304 instance
     */
    public static create(properties?: Iquery_304): query_304;

    /**
     * Encodes the specified query_304 message. Does not implicitly {@link query_304.verify|verify} messages.
     * @param message query_304 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_304, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_304 message, length delimited. Does not implicitly {@link query_304.verify|verify} messages.
     * @param message query_304 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_304, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_304 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_304
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_304;

    /**
     * Decodes a query_304 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_304
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_304;

    /**
     * Verifies a query_304 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_304 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_304
     */
    public static fromObject(object: { [k: string]: any }): query_304;

    /**
     * Creates a plain object from a query_304 message. Also converts values to other types if specified.
     * @param message query_304
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_304, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_304 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_304
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_304. */
export class reply_304 implements Ireply_304 {

    /**
     * Constructs a new reply_304.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_304);

    /** reply_304 status. */
    public status: number;

    /** reply_304 message. */
    public message: string;

    /** reply_304 player_full_id. */
    public player_full_id?: (Iplayer_full_id|null);

    /**
     * Creates a new reply_304 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_304 instance
     */
    public static create(properties?: Ireply_304): reply_304;

    /**
     * Encodes the specified reply_304 message. Does not implicitly {@link reply_304.verify|verify} messages.
     * @param message reply_304 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_304, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_304 message, length delimited. Does not implicitly {@link reply_304.verify|verify} messages.
     * @param message reply_304 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_304, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_304 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_304
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_304;

    /**
     * Decodes a reply_304 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_304
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_304;

    /**
     * Verifies a reply_304 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_304 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_304
     */
    public static fromObject(object: { [k: string]: any }): reply_304;

    /**
     * Creates a plain object from a reply_304 message. Also converts values to other types if specified.
     * @param message reply_304
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_304, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_304 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_304
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_305. */
export class query_305 implements Iquery_305 {

    /**
     * Constructs a new query_305.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_305);

    /** query_305 nickname. */
    public nickname: string;

    /**
     * Creates a new query_305 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_305 instance
     */
    public static create(properties?: Iquery_305): query_305;

    /**
     * Encodes the specified query_305 message. Does not implicitly {@link query_305.verify|verify} messages.
     * @param message query_305 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_305, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_305 message, length delimited. Does not implicitly {@link query_305.verify|verify} messages.
     * @param message query_305 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_305, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_305 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_305
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_305;

    /**
     * Decodes a query_305 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_305
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_305;

    /**
     * Verifies a query_305 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_305 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_305
     */
    public static fromObject(object: { [k: string]: any }): query_305;

    /**
     * Creates a plain object from a query_305 message. Also converts values to other types if specified.
     * @param message query_305
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_305, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_305 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_305
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_305. */
export class reply_305 implements Ireply_305 {

    /**
     * Constructs a new reply_305.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_305);

    /** reply_305 status. */
    public status: number;

    /** reply_305 message. */
    public message: string;

    /** reply_305 relation_list. */
    public relation_list: Irelation[];

    /** reply_305 nickname. */
    public nickname: string;

    /**
     * Creates a new reply_305 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_305 instance
     */
    public static create(properties?: Ireply_305): reply_305;

    /**
     * Encodes the specified reply_305 message. Does not implicitly {@link reply_305.verify|verify} messages.
     * @param message reply_305 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_305, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_305 message, length delimited. Does not implicitly {@link reply_305.verify|verify} messages.
     * @param message reply_305 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_305, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_305 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_305
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_305;

    /**
     * Decodes a reply_305 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_305
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_305;

    /**
     * Verifies a reply_305 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_305 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_305
     */
    public static fromObject(object: { [k: string]: any }): reply_305;

    /**
     * Creates a plain object from a reply_305 message. Also converts values to other types if specified.
     * @param message reply_305
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_305, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_305 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_305
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_306. */
export class query_306 implements Iquery_306 {

    /**
     * Constructs a new query_306.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_306);

    /** query_306 player_full_id. */
    public player_full_id?: (Iplayer_full_id|null);

    /**
     * Creates a new query_306 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_306 instance
     */
    public static create(properties?: Iquery_306): query_306;

    /**
     * Encodes the specified query_306 message. Does not implicitly {@link query_306.verify|verify} messages.
     * @param message query_306 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_306, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_306 message, length delimited. Does not implicitly {@link query_306.verify|verify} messages.
     * @param message query_306 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_306, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_306 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_306
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_306;

    /**
     * Decodes a query_306 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_306
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_306;

    /**
     * Verifies a query_306 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_306 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_306
     */
    public static fromObject(object: { [k: string]: any }): query_306;

    /**
     * Creates a plain object from a query_306 message. Also converts values to other types if specified.
     * @param message query_306
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_306, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_306 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_306
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_306. */
export class reply_306 implements Ireply_306 {

    /**
     * Constructs a new reply_306.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_306);

    /** reply_306 status. */
    public status: number;

    /** reply_306 message. */
    public message: string;

    /** reply_306 player_full_id. */
    public player_full_id?: (Iplayer_full_id|null);

    /**
     * Creates a new reply_306 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_306 instance
     */
    public static create(properties?: Ireply_306): reply_306;

    /**
     * Encodes the specified reply_306 message. Does not implicitly {@link reply_306.verify|verify} messages.
     * @param message reply_306 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_306, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_306 message, length delimited. Does not implicitly {@link reply_306.verify|verify} messages.
     * @param message reply_306 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_306, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_306 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_306
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_306;

    /**
     * Decodes a reply_306 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_306
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_306;

    /**
     * Verifies a reply_306 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_306 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_306
     */
    public static fromObject(object: { [k: string]: any }): reply_306;

    /**
     * Creates a plain object from a reply_306 message. Also converts values to other types if specified.
     * @param message reply_306
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_306, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_306 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_306
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_307. */
export class query_307 implements Iquery_307 {

    /**
     * Constructs a new query_307.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_307);

    /** query_307 full_id_list. */
    public full_id_list: Iplayer_full_id[];

    /**
     * Creates a new query_307 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_307 instance
     */
    public static create(properties?: Iquery_307): query_307;

    /**
     * Encodes the specified query_307 message. Does not implicitly {@link query_307.verify|verify} messages.
     * @param message query_307 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_307, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_307 message, length delimited. Does not implicitly {@link query_307.verify|verify} messages.
     * @param message query_307 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_307, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_307 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_307
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_307;

    /**
     * Decodes a query_307 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_307
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_307;

    /**
     * Verifies a query_307 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_307 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_307
     */
    public static fromObject(object: { [k: string]: any }): query_307;

    /**
     * Creates a plain object from a query_307 message. Also converts values to other types if specified.
     * @param message query_307
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_307, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_307 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_307
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_307. */
export class reply_307 implements Ireply_307 {

    /**
     * Constructs a new reply_307.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_307);

    /** reply_307 status. */
    public status: number;

    /** reply_307 message. */
    public message: string;

    /** reply_307 ok_full_id_list. */
    public ok_full_id_list: Iplayer_full_id[];

    /** reply_307 fail_full_id_list. */
    public fail_full_id_list: Iplayer_full_id[];

    /**
     * Creates a new reply_307 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_307 instance
     */
    public static create(properties?: Ireply_307): reply_307;

    /**
     * Encodes the specified reply_307 message. Does not implicitly {@link reply_307.verify|verify} messages.
     * @param message reply_307 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_307, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_307 message, length delimited. Does not implicitly {@link reply_307.verify|verify} messages.
     * @param message reply_307 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_307, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_307 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_307
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_307;

    /**
     * Decodes a reply_307 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_307
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_307;

    /**
     * Verifies a reply_307 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_307 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_307
     */
    public static fromObject(object: { [k: string]: any }): reply_307;

    /**
     * Creates a plain object from a reply_307 message. Also converts values to other types if specified.
     * @param message reply_307
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_307, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_307 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_307
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_310. */
export class query_310 implements Iquery_310 {

    /**
     * Constructs a new query_310.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_310);

    /**
     * Creates a new query_310 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_310 instance
     */
    public static create(properties?: Iquery_310): query_310;

    /**
     * Encodes the specified query_310 message. Does not implicitly {@link query_310.verify|verify} messages.
     * @param message query_310 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_310, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_310 message, length delimited. Does not implicitly {@link query_310.verify|verify} messages.
     * @param message query_310 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_310, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_310 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_310
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_310;

    /**
     * Decodes a query_310 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_310
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_310;

    /**
     * Verifies a query_310 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_310 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_310
     */
    public static fromObject(object: { [k: string]: any }): query_310;

    /**
     * Creates a plain object from a query_310 message. Also converts values to other types if specified.
     * @param message query_310
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_310, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_310 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_310
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_310. */
export class reply_310 implements Ireply_310 {

    /**
     * Constructs a new reply_310.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_310);

    /** reply_310 relation_list. */
    public relation_list: Irelation[];

    /**
     * Creates a new reply_310 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_310 instance
     */
    public static create(properties?: Ireply_310): reply_310;

    /**
     * Encodes the specified reply_310 message. Does not implicitly {@link reply_310.verify|verify} messages.
     * @param message reply_310 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_310, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_310 message, length delimited. Does not implicitly {@link reply_310.verify|verify} messages.
     * @param message reply_310 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_310, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_310 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_310
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_310;

    /**
     * Decodes a reply_310 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_310
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_310;

    /**
     * Verifies a reply_310 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_310 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_310
     */
    public static fromObject(object: { [k: string]: any }): reply_310;

    /**
     * Creates a plain object from a reply_310 message. Also converts values to other types if specified.
     * @param message reply_310
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_310, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_310 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_310
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_311. */
export class query_311 implements Iquery_311 {

    /**
     * Constructs a new query_311.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_311);

    /** query_311 player_full_id. */
    public player_full_id?: (Iplayer_full_id|null);

    /**
     * Creates a new query_311 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_311 instance
     */
    public static create(properties?: Iquery_311): query_311;

    /**
     * Encodes the specified query_311 message. Does not implicitly {@link query_311.verify|verify} messages.
     * @param message query_311 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_311, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_311 message, length delimited. Does not implicitly {@link query_311.verify|verify} messages.
     * @param message query_311 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_311, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_311 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_311
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_311;

    /**
     * Decodes a query_311 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_311
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_311;

    /**
     * Verifies a query_311 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_311 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_311
     */
    public static fromObject(object: { [k: string]: any }): query_311;

    /**
     * Creates a plain object from a query_311 message. Also converts values to other types if specified.
     * @param message query_311
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_311, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_311 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_311
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_311. */
export class reply_311 implements Ireply_311 {

    /**
     * Constructs a new reply_311.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_311);

    /** reply_311 status. */
    public status: number;

    /** reply_311 message. */
    public message: string;

    /** reply_311 friend_list. */
    public friend_list: Ifriend[];

    /**
     * Creates a new reply_311 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_311 instance
     */
    public static create(properties?: Ireply_311): reply_311;

    /**
     * Encodes the specified reply_311 message. Does not implicitly {@link reply_311.verify|verify} messages.
     * @param message reply_311 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_311, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_311 message, length delimited. Does not implicitly {@link reply_311.verify|verify} messages.
     * @param message reply_311 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_311, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_311 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_311
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_311;

    /**
     * Decodes a reply_311 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_311
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_311;

    /**
     * Verifies a reply_311 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_311 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_311
     */
    public static fromObject(object: { [k: string]: any }): reply_311;

    /**
     * Creates a plain object from a reply_311 message. Also converts values to other types if specified.
     * @param message reply_311
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_311, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_311 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_311
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_312. */
export class query_312 implements Iquery_312 {

    /**
     * Constructs a new query_312.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_312);

    /** query_312 full_id_list. */
    public full_id_list: Iplayer_full_id[];

    /**
     * Creates a new query_312 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_312 instance
     */
    public static create(properties?: Iquery_312): query_312;

    /**
     * Encodes the specified query_312 message. Does not implicitly {@link query_312.verify|verify} messages.
     * @param message query_312 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_312, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_312 message, length delimited. Does not implicitly {@link query_312.verify|verify} messages.
     * @param message query_312 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_312, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_312 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_312
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_312;

    /**
     * Decodes a query_312 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_312
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_312;

    /**
     * Verifies a query_312 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_312 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_312
     */
    public static fromObject(object: { [k: string]: any }): query_312;

    /**
     * Creates a plain object from a query_312 message. Also converts values to other types if specified.
     * @param message query_312
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_312, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_312 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_312
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_312. */
export class reply_312 implements Ireply_312 {

    /**
     * Constructs a new reply_312.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_312);

    /** reply_312 status. */
    public status: number;

    /** reply_312 message. */
    public message: string;

    /** reply_312 friend_list. */
    public friend_list: Ifriend[];

    /**
     * Creates a new reply_312 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_312 instance
     */
    public static create(properties?: Ireply_312): reply_312;

    /**
     * Encodes the specified reply_312 message. Does not implicitly {@link reply_312.verify|verify} messages.
     * @param message reply_312 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_312, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_312 message, length delimited. Does not implicitly {@link reply_312.verify|verify} messages.
     * @param message reply_312 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_312, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_312 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_312
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_312;

    /**
     * Decodes a reply_312 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_312
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_312;

    /**
     * Verifies a reply_312 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_312 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_312
     */
    public static fromObject(object: { [k: string]: any }): reply_312;

    /**
     * Creates a plain object from a reply_312 message. Also converts values to other types if specified.
     * @param message reply_312
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_312, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_312 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_312
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_313. */
export class reply_313 implements Ireply_313 {

    /**
     * Constructs a new reply_313.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_313);

    /** reply_313 friend_list. */
    public friend_list: Ifriend[];

    /**
     * Creates a new reply_313 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_313 instance
     */
    public static create(properties?: Ireply_313): reply_313;

    /**
     * Encodes the specified reply_313 message. Does not implicitly {@link reply_313.verify|verify} messages.
     * @param message reply_313 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_313, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_313 message, length delimited. Does not implicitly {@link reply_313.verify|verify} messages.
     * @param message reply_313 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_313, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_313 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_313
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_313;

    /**
     * Decodes a reply_313 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_313
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_313;

    /**
     * Verifies a reply_313 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_313 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_313
     */
    public static fromObject(object: { [k: string]: any }): reply_313;

    /**
     * Creates a plain object from a reply_313 message. Also converts values to other types if specified.
     * @param message reply_313
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_313, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_313 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_313
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_314. */
export class query_314 implements Iquery_314 {

    /**
     * Constructs a new query_314.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_314);

    /** query_314 full_id_list. */
    public full_id_list: Iplayer_full_id[];

    /**
     * Creates a new query_314 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_314 instance
     */
    public static create(properties?: Iquery_314): query_314;

    /**
     * Encodes the specified query_314 message. Does not implicitly {@link query_314.verify|verify} messages.
     * @param message query_314 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_314, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_314 message, length delimited. Does not implicitly {@link query_314.verify|verify} messages.
     * @param message query_314 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_314, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_314 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_314
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_314;

    /**
     * Decodes a query_314 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_314
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_314;

    /**
     * Verifies a query_314 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_314 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_314
     */
    public static fromObject(object: { [k: string]: any }): query_314;

    /**
     * Creates a plain object from a query_314 message. Also converts values to other types if specified.
     * @param message query_314
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_314, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_314 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_314
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_314. */
export class reply_314 implements Ireply_314 {

    /**
     * Constructs a new reply_314.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_314);

    /** reply_314 status. */
    public status: number;

    /** reply_314 message. */
    public message: string;

    /** reply_314 full_id_list. */
    public full_id_list: Iplayer_full_id[];

    /**
     * Creates a new reply_314 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_314 instance
     */
    public static create(properties?: Ireply_314): reply_314;

    /**
     * Encodes the specified reply_314 message. Does not implicitly {@link reply_314.verify|verify} messages.
     * @param message reply_314 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_314, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_314 message, length delimited. Does not implicitly {@link reply_314.verify|verify} messages.
     * @param message reply_314 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_314, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_314 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_314
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_314;

    /**
     * Decodes a reply_314 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_314
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_314;

    /**
     * Verifies a reply_314 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_314 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_314
     */
    public static fromObject(object: { [k: string]: any }): reply_314;

    /**
     * Creates a plain object from a reply_314 message. Also converts values to other types if specified.
     * @param message reply_314
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_314, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_314 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_314
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_315. */
export class query_315 implements Iquery_315 {

    /**
     * Constructs a new query_315.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_315);

    /**
     * Creates a new query_315 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_315 instance
     */
    public static create(properties?: Iquery_315): query_315;

    /**
     * Encodes the specified query_315 message. Does not implicitly {@link query_315.verify|verify} messages.
     * @param message query_315 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_315, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_315 message, length delimited. Does not implicitly {@link query_315.verify|verify} messages.
     * @param message query_315 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_315, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_315 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_315
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_315;

    /**
     * Decodes a query_315 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_315
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_315;

    /**
     * Verifies a query_315 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_315 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_315
     */
    public static fromObject(object: { [k: string]: any }): query_315;

    /**
     * Creates a plain object from a query_315 message. Also converts values to other types if specified.
     * @param message query_315
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_315, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_315 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_315
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_315. */
export class reply_315 implements Ireply_315 {

    /**
     * Constructs a new reply_315.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_315);

    /** reply_315 relation_list. */
    public relation_list: Irelation[];

    /**
     * Creates a new reply_315 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_315 instance
     */
    public static create(properties?: Ireply_315): reply_315;

    /**
     * Encodes the specified reply_315 message. Does not implicitly {@link reply_315.verify|verify} messages.
     * @param message reply_315 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_315, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_315 message, length delimited. Does not implicitly {@link reply_315.verify|verify} messages.
     * @param message reply_315 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_315, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_315 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_315
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_315;

    /**
     * Decodes a reply_315 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_315
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_315;

    /**
     * Verifies a reply_315 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_315 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_315
     */
    public static fromObject(object: { [k: string]: any }): reply_315;

    /**
     * Creates a plain object from a reply_315 message. Also converts values to other types if specified.
     * @param message reply_315
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_315, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_315 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_315
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_316. */
export class query_316 implements Iquery_316 {

    /**
     * Constructs a new query_316.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_316);

    /** query_316 full_id_list. */
    public full_id_list: Iplayer_full_id[];

    /**
     * Creates a new query_316 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_316 instance
     */
    public static create(properties?: Iquery_316): query_316;

    /**
     * Encodes the specified query_316 message. Does not implicitly {@link query_316.verify|verify} messages.
     * @param message query_316 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_316, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_316 message, length delimited. Does not implicitly {@link query_316.verify|verify} messages.
     * @param message query_316 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_316, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_316 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_316
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_316;

    /**
     * Decodes a query_316 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_316
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_316;

    /**
     * Verifies a query_316 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_316 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_316
     */
    public static fromObject(object: { [k: string]: any }): query_316;

    /**
     * Creates a plain object from a query_316 message. Also converts values to other types if specified.
     * @param message query_316
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_316, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_316 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_316
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_316. */
export class reply_316 implements Ireply_316 {

    /**
     * Constructs a new reply_316.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_316);

    /** reply_316 status. */
    public status: number;

    /** reply_316 message. */
    public message: string;

    /** reply_316 full_id_list. */
    public full_id_list: Iplayer_full_id[];

    /**
     * Creates a new reply_316 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_316 instance
     */
    public static create(properties?: Ireply_316): reply_316;

    /**
     * Encodes the specified reply_316 message. Does not implicitly {@link reply_316.verify|verify} messages.
     * @param message reply_316 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_316, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_316 message, length delimited. Does not implicitly {@link reply_316.verify|verify} messages.
     * @param message reply_316 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_316, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_316 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_316
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_316;

    /**
     * Decodes a reply_316 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_316
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_316;

    /**
     * Verifies a reply_316 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_316 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_316
     */
    public static fromObject(object: { [k: string]: any }): reply_316;

    /**
     * Creates a plain object from a reply_316 message. Also converts values to other types if specified.
     * @param message reply_316
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_316, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_316 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_316
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_317. */
export class query_317 implements Iquery_317 {

    /**
     * Constructs a new query_317.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_317);

    /** query_317 full_id_list. */
    public full_id_list: Iplayer_full_id[];

    /**
     * Creates a new query_317 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_317 instance
     */
    public static create(properties?: Iquery_317): query_317;

    /**
     * Encodes the specified query_317 message. Does not implicitly {@link query_317.verify|verify} messages.
     * @param message query_317 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_317, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_317 message, length delimited. Does not implicitly {@link query_317.verify|verify} messages.
     * @param message query_317 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_317, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_317 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_317
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_317;

    /**
     * Decodes a query_317 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_317
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_317;

    /**
     * Verifies a query_317 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_317 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_317
     */
    public static fromObject(object: { [k: string]: any }): query_317;

    /**
     * Creates a plain object from a query_317 message. Also converts values to other types if specified.
     * @param message query_317
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_317, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_317 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_317
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_317. */
export class reply_317 implements Ireply_317 {

    /**
     * Constructs a new reply_317.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_317);

    /** reply_317 status. */
    public status: number;

    /** reply_317 message. */
    public message: string;

    /** reply_317 full_id_list. */
    public full_id_list: Iplayer_full_id[];

    /**
     * Creates a new reply_317 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_317 instance
     */
    public static create(properties?: Ireply_317): reply_317;

    /**
     * Encodes the specified reply_317 message. Does not implicitly {@link reply_317.verify|verify} messages.
     * @param message reply_317 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_317, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_317 message, length delimited. Does not implicitly {@link reply_317.verify|verify} messages.
     * @param message reply_317 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_317, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_317 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_317
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_317;

    /**
     * Decodes a reply_317 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_317
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_317;

    /**
     * Verifies a reply_317 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_317 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_317
     */
    public static fromObject(object: { [k: string]: any }): reply_317;

    /**
     * Creates a plain object from a reply_317 message. Also converts values to other types if specified.
     * @param message reply_317
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_317, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_317 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_317
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_318. */
export class query_318 implements Iquery_318 {

    /**
     * Constructs a new query_318.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_318);

    /** query_318 text. */
    public text: string;

    /** query_318 to_full_id. */
    public to_full_id?: (Iplayer_full_id|null);

    /**
     * Creates a new query_318 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_318 instance
     */
    public static create(properties?: Iquery_318): query_318;

    /**
     * Encodes the specified query_318 message. Does not implicitly {@link query_318.verify|verify} messages.
     * @param message query_318 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_318, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_318 message, length delimited. Does not implicitly {@link query_318.verify|verify} messages.
     * @param message query_318 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_318, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_318 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_318
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_318;

    /**
     * Decodes a query_318 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_318
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_318;

    /**
     * Verifies a query_318 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_318 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_318
     */
    public static fromObject(object: { [k: string]: any }): query_318;

    /**
     * Creates a plain object from a query_318 message. Also converts values to other types if specified.
     * @param message query_318
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_318, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_318 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_318
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_318. */
export class reply_318 implements Ireply_318 {

    /**
     * Constructs a new reply_318.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_318);

    /** reply_318 status. */
    public status: number;

    /** reply_318 message. */
    public message: string;

    /** reply_318 leave_message_info. */
    public leave_message_info?: (Ileave_message_info|null);

    /**
     * Creates a new reply_318 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_318 instance
     */
    public static create(properties?: Ireply_318): reply_318;

    /**
     * Encodes the specified reply_318 message. Does not implicitly {@link reply_318.verify|verify} messages.
     * @param message reply_318 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_318, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_318 message, length delimited. Does not implicitly {@link reply_318.verify|verify} messages.
     * @param message reply_318 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_318, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_318 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_318
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_318;

    /**
     * Decodes a reply_318 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_318
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_318;

    /**
     * Verifies a reply_318 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_318 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_318
     */
    public static fromObject(object: { [k: string]: any }): reply_318;

    /**
     * Creates a plain object from a reply_318 message. Also converts values to other types if specified.
     * @param message reply_318
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_318, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_318 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_318
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a leave_message_info. */
export class leave_message_info implements Ileave_message_info {

    /**
     * Constructs a new leave_message_info.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ileave_message_info);

    /** leave_message_info version. */
    public version: number;

    /** leave_message_info full_id. */
    public full_id?: (Iplayer_full_id|null);

    /** leave_message_info num. */
    public num: number;

    /**
     * Creates a new leave_message_info instance using the specified properties.
     * @param [properties] Properties to set
     * @returns leave_message_info instance
     */
    public static create(properties?: Ileave_message_info): leave_message_info;

    /**
     * Encodes the specified leave_message_info message. Does not implicitly {@link leave_message_info.verify|verify} messages.
     * @param message leave_message_info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ileave_message_info, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified leave_message_info message, length delimited. Does not implicitly {@link leave_message_info.verify|verify} messages.
     * @param message leave_message_info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ileave_message_info, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a leave_message_info message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns leave_message_info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): leave_message_info;

    /**
     * Decodes a leave_message_info message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns leave_message_info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): leave_message_info;

    /**
     * Verifies a leave_message_info message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a leave_message_info message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns leave_message_info
     */
    public static fromObject(object: { [k: string]: any }): leave_message_info;

    /**
     * Creates a plain object from a leave_message_info message. Also converts values to other types if specified.
     * @param message leave_message_info
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: leave_message_info, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this leave_message_info to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for leave_message_info
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_319. */
export class query_319 implements Iquery_319 {

    /**
     * Constructs a new query_319.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_319);

    /**
     * Creates a new query_319 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_319 instance
     */
    public static create(properties?: Iquery_319): query_319;

    /**
     * Encodes the specified query_319 message. Does not implicitly {@link query_319.verify|verify} messages.
     * @param message query_319 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_319, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_319 message, length delimited. Does not implicitly {@link query_319.verify|verify} messages.
     * @param message query_319 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_319, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_319 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_319
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_319;

    /**
     * Decodes a query_319 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_319
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_319;

    /**
     * Verifies a query_319 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_319 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_319
     */
    public static fromObject(object: { [k: string]: any }): query_319;

    /**
     * Creates a plain object from a query_319 message. Also converts values to other types if specified.
     * @param message query_319
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_319, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_319 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_319
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_319. */
export class reply_319 implements Ireply_319 {

    /**
     * Constructs a new reply_319.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_319);

    /** reply_319 status. */
    public status: number;

    /** reply_319 message. */
    public message: string;

    /** reply_319 leave_message_info_list. */
    public leave_message_info_list: Ileave_message_info[];

    /**
     * Creates a new reply_319 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_319 instance
     */
    public static create(properties?: Ireply_319): reply_319;

    /**
     * Encodes the specified reply_319 message. Does not implicitly {@link reply_319.verify|verify} messages.
     * @param message reply_319 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_319, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_319 message, length delimited. Does not implicitly {@link reply_319.verify|verify} messages.
     * @param message reply_319 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_319, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_319 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_319
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_319;

    /**
     * Decodes a reply_319 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_319
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_319;

    /**
     * Verifies a reply_319 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_319 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_319
     */
    public static fromObject(object: { [k: string]: any }): reply_319;

    /**
     * Creates a plain object from a reply_319 message. Also converts values to other types if specified.
     * @param message reply_319
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_319, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_319 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_319
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_320. */
export class query_320 implements Iquery_320 {

    /**
     * Constructs a new query_320.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_320);

    /** query_320 full_id. */
    public full_id?: (Iplayer_full_id|null);

    /**
     * Creates a new query_320 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_320 instance
     */
    public static create(properties?: Iquery_320): query_320;

    /**
     * Encodes the specified query_320 message. Does not implicitly {@link query_320.verify|verify} messages.
     * @param message query_320 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_320, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_320 message, length delimited. Does not implicitly {@link query_320.verify|verify} messages.
     * @param message query_320 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_320, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_320 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_320
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_320;

    /**
     * Decodes a query_320 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_320
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_320;

    /**
     * Verifies a query_320 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_320 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_320
     */
    public static fromObject(object: { [k: string]: any }): query_320;

    /**
     * Creates a plain object from a query_320 message. Also converts values to other types if specified.
     * @param message query_320
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_320, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_320 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_320
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_320. */
export class reply_320 implements Ireply_320 {

    /**
     * Constructs a new reply_320.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_320);

    /** reply_320 status. */
    public status: number;

    /** reply_320 message. */
    public message: string;

    /** reply_320 other_player. */
    public other_player?: (Iother_player|null);

    /** reply_320 friend_status. */
    public friend_status: number;

    /** reply_320 rank. */
    public rank: number;

    /**
     * Creates a new reply_320 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_320 instance
     */
    public static create(properties?: Ireply_320): reply_320;

    /**
     * Encodes the specified reply_320 message. Does not implicitly {@link reply_320.verify|verify} messages.
     * @param message reply_320 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_320, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_320 message, length delimited. Does not implicitly {@link reply_320.verify|verify} messages.
     * @param message reply_320 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_320, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_320 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_320
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_320;

    /**
     * Decodes a reply_320 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_320
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_320;

    /**
     * Verifies a reply_320 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_320 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_320
     */
    public static fromObject(object: { [k: string]: any }): reply_320;

    /**
     * Creates a plain object from a reply_320 message. Also converts values to other types if specified.
     * @param message reply_320
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_320, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_320 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_320
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_321. */
export class query_321 implements Iquery_321 {

    /**
     * Constructs a new query_321.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_321);

    /** query_321 full_id. */
    public full_id?: (Iplayer_full_id|null);

    /**
     * Creates a new query_321 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_321 instance
     */
    public static create(properties?: Iquery_321): query_321;

    /**
     * Encodes the specified query_321 message. Does not implicitly {@link query_321.verify|verify} messages.
     * @param message query_321 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_321, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_321 message, length delimited. Does not implicitly {@link query_321.verify|verify} messages.
     * @param message query_321 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_321, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_321 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_321
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_321;

    /**
     * Decodes a query_321 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_321
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_321;

    /**
     * Verifies a query_321 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_321 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_321
     */
    public static fromObject(object: { [k: string]: any }): query_321;

    /**
     * Creates a plain object from a query_321 message. Also converts values to other types if specified.
     * @param message query_321
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_321, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_321 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_321
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_321. */
export class reply_321 implements Ireply_321 {

    /**
     * Constructs a new reply_321.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_321);

    /** reply_321 status. */
    public status: number;

    /** reply_321 message. */
    public message: string;

    /**
     * Creates a new reply_321 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_321 instance
     */
    public static create(properties?: Ireply_321): reply_321;

    /**
     * Encodes the specified reply_321 message. Does not implicitly {@link reply_321.verify|verify} messages.
     * @param message reply_321 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_321, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_321 message, length delimited. Does not implicitly {@link reply_321.verify|verify} messages.
     * @param message reply_321 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_321, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_321 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_321
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_321;

    /**
     * Decodes a reply_321 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_321
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_321;

    /**
     * Verifies a reply_321 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_321 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_321
     */
    public static fromObject(object: { [k: string]: any }): reply_321;

    /**
     * Creates a plain object from a reply_321 message. Also converts values to other types if specified.
     * @param message reply_321
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_321, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_321 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_321
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_322. */
export class reply_322 implements Ireply_322 {

    /**
     * Constructs a new reply_322.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_322);

    /** reply_322 full_id. */
    public full_id?: (Iplayer_full_id|null);

    /**
     * Creates a new reply_322 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_322 instance
     */
    public static create(properties?: Ireply_322): reply_322;

    /**
     * Encodes the specified reply_322 message. Does not implicitly {@link reply_322.verify|verify} messages.
     * @param message reply_322 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_322, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_322 message, length delimited. Does not implicitly {@link reply_322.verify|verify} messages.
     * @param message reply_322 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_322, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_322 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_322
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_322;

    /**
     * Decodes a reply_322 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_322
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_322;

    /**
     * Verifies a reply_322 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_322 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_322
     */
    public static fromObject(object: { [k: string]: any }): reply_322;

    /**
     * Creates a plain object from a reply_322 message. Also converts values to other types if specified.
     * @param message reply_322
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_322, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_322 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_322
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a goods_show. */
export class goods_show implements Igoods_show {

    /**
     * Constructs a new goods_show.
     * @param [properties] Properties to set
     */
    constructor(properties?: Igoods_show);

    /** goods_show goods_id. */
    public goods_id: number;

    /** goods_show num. */
    public num: number;

    /** goods_show value. */
    public value: (number|Long);

    /**
     * Creates a new goods_show instance using the specified properties.
     * @param [properties] Properties to set
     * @returns goods_show instance
     */
    public static create(properties?: Igoods_show): goods_show;

    /**
     * Encodes the specified goods_show message. Does not implicitly {@link goods_show.verify|verify} messages.
     * @param message goods_show message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Igoods_show, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified goods_show message, length delimited. Does not implicitly {@link goods_show.verify|verify} messages.
     * @param message goods_show message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Igoods_show, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a goods_show message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns goods_show
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): goods_show;

    /**
     * Decodes a goods_show message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns goods_show
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): goods_show;

    /**
     * Verifies a goods_show message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a goods_show message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns goods_show
     */
    public static fromObject(object: { [k: string]: any }): goods_show;

    /**
     * Creates a plain object from a goods_show message. Also converts values to other types if specified.
     * @param message goods_show
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: goods_show, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this goods_show to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for goods_show
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an asset. */
export class asset implements Iasset {

    /**
     * Constructs a new asset.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iasset);

    /** asset version. */
    public version: number;

    /** asset goods_id. */
    public goods_id: number;

    /** asset num. */
    public num: number;

    /**
     * Creates a new asset instance using the specified properties.
     * @param [properties] Properties to set
     * @returns asset instance
     */
    public static create(properties?: Iasset): asset;

    /**
     * Encodes the specified asset message. Does not implicitly {@link asset.verify|verify} messages.
     * @param message asset message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iasset, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified asset message, length delimited. Does not implicitly {@link asset.verify|verify} messages.
     * @param message asset message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iasset, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an asset message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns asset
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): asset;

    /**
     * Decodes an asset message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns asset
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): asset;

    /**
     * Verifies an asset message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an asset message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns asset
     */
    public static fromObject(object: { [k: string]: any }): asset;

    /**
     * Creates a plain object from an asset message. Also converts values to other types if specified.
     * @param message asset
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: asset, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this asset to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for asset
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a normal_goods. */
export class normal_goods implements Inormal_goods {

    /**
     * Constructs a new normal_goods.
     * @param [properties] Properties to set
     */
    constructor(properties?: Inormal_goods);

    /** normal_goods version. */
    public version: number;

    /** normal_goods guid. */
    public guid: string;

    /** normal_goods goods_id. */
    public goods_id: number;

    /** normal_goods num. */
    public num: number;

    /** normal_goods exp_time. */
    public exp_time: number;

    /**
     * Creates a new normal_goods instance using the specified properties.
     * @param [properties] Properties to set
     * @returns normal_goods instance
     */
    public static create(properties?: Inormal_goods): normal_goods;

    /**
     * Encodes the specified normal_goods message. Does not implicitly {@link normal_goods.verify|verify} messages.
     * @param message normal_goods message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Inormal_goods, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified normal_goods message, length delimited. Does not implicitly {@link normal_goods.verify|verify} messages.
     * @param message normal_goods message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Inormal_goods, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a normal_goods message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns normal_goods
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): normal_goods;

    /**
     * Decodes a normal_goods message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns normal_goods
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): normal_goods;

    /**
     * Verifies a normal_goods message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a normal_goods message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns normal_goods
     */
    public static fromObject(object: { [k: string]: any }): normal_goods;

    /**
     * Creates a plain object from a normal_goods message. Also converts values to other types if specified.
     * @param message normal_goods
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: normal_goods, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this normal_goods to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for normal_goods
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an equip_goods. */
export class equip_goods implements Iequip_goods {

    /**
     * Constructs a new equip_goods.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iequip_goods);

    /** equip_goods version. */
    public version: number;

    /** equip_goods guid. */
    public guid: string;

    /** equip_goods goods_id. */
    public goods_id: number;

    /** equip_goods num. */
    public num: number;

    /** equip_goods strength_lv. */
    public strength_lv: number;

    /** equip_goods strength_all_exp. */
    public strength_all_exp: number;

    /** equip_goods part. */
    public part: number;

    /** equip_goods career. */
    public career: number;

    /** equip_goods hero_id. */
    public hero_id: number;

    /** equip_goods time. */
    public time: number;

    /** equip_goods exp_time. */
    public exp_time: number;

    /** equip_goods primary_attr_list. */
    public primary_attr_list: Iequip_attr[];

    /** equip_goods secondary_attr_list. */
    public secondary_attr_list: Iequip_attr[];

    /** equip_goods star. */
    public star: number;

    /** equip_goods primary_init_attr_list. */
    public primary_init_attr_list: Iequip_attr[];

    /** equip_goods secondary_init_attr_list. */
    public secondary_init_attr_list: Iequip_attr[];

    /** equip_goods identified_type. */
    public identified_type: number;

    /** equip_goods quality_attr. */
    public quality_attr: Iequip_attr[];

    /** equip_goods cur_star_rising_num. */
    public cur_star_rising_num: number;

    /** equip_goods quality. */
    public quality: number;

    /** equip_goods recast_status. */
    public recast_status: number;

    /** equip_goods equip_type. */
    public equip_type: number;

    /**
     * Creates a new equip_goods instance using the specified properties.
     * @param [properties] Properties to set
     * @returns equip_goods instance
     */
    public static create(properties?: Iequip_goods): equip_goods;

    /**
     * Encodes the specified equip_goods message. Does not implicitly {@link equip_goods.verify|verify} messages.
     * @param message equip_goods message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iequip_goods, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified equip_goods message, length delimited. Does not implicitly {@link equip_goods.verify|verify} messages.
     * @param message equip_goods message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iequip_goods, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an equip_goods message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns equip_goods
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): equip_goods;

    /**
     * Decodes an equip_goods message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns equip_goods
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): equip_goods;

    /**
     * Verifies an equip_goods message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an equip_goods message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns equip_goods
     */
    public static fromObject(object: { [k: string]: any }): equip_goods;

    /**
     * Creates a plain object from an equip_goods message. Also converts values to other types if specified.
     * @param message equip_goods
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: equip_goods, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this equip_goods to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for equip_goods
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an equip_attr. */
export class equip_attr implements Iequip_attr {

    /**
     * Constructs a new equip_attr.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iequip_attr);

    /** equip_attr id. */
    public id: number;

    /** equip_attr attr. */
    public attr?: (Iattr|null);

    /** equip_attr num. */
    public num: number;

    /** equip_attr wish_attr. */
    public wish_attr?: (Iattr|null);

    /**
     * Creates a new equip_attr instance using the specified properties.
     * @param [properties] Properties to set
     * @returns equip_attr instance
     */
    public static create(properties?: Iequip_attr): equip_attr;

    /**
     * Encodes the specified equip_attr message. Does not implicitly {@link equip_attr.verify|verify} messages.
     * @param message equip_attr message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iequip_attr, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified equip_attr message, length delimited. Does not implicitly {@link equip_attr.verify|verify} messages.
     * @param message equip_attr message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iequip_attr, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an equip_attr message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns equip_attr
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): equip_attr;

    /**
     * Decodes an equip_attr message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns equip_attr
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): equip_attr;

    /**
     * Verifies an equip_attr message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an equip_attr message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns equip_attr
     */
    public static fromObject(object: { [k: string]: any }): equip_attr;

    /**
     * Creates a plain object from an equip_attr message. Also converts values to other types if specified.
     * @param message equip_attr
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: equip_attr, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this equip_attr to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for equip_attr
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_2000. */
export class query_2000 implements Iquery_2000 {

    /**
     * Constructs a new query_2000.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_2000);

    /**
     * Creates a new query_2000 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_2000 instance
     */
    public static create(properties?: Iquery_2000): query_2000;

    /**
     * Encodes the specified query_2000 message. Does not implicitly {@link query_2000.verify|verify} messages.
     * @param message query_2000 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_2000, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_2000 message, length delimited. Does not implicitly {@link query_2000.verify|verify} messages.
     * @param message query_2000 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_2000, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_2000 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_2000
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_2000;

    /**
     * Decodes a query_2000 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_2000
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_2000;

    /**
     * Verifies a query_2000 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_2000 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_2000
     */
    public static fromObject(object: { [k: string]: any }): query_2000;

    /**
     * Creates a plain object from a query_2000 message. Also converts values to other types if specified.
     * @param message query_2000
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_2000, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_2000 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_2000
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_2000. */
export class reply_2000 implements Ireply_2000 {

    /**
     * Constructs a new reply_2000.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_2000);

    /** reply_2000 assets. */
    public assets: Iasset[];

    /**
     * Creates a new reply_2000 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_2000 instance
     */
    public static create(properties?: Ireply_2000): reply_2000;

    /**
     * Encodes the specified reply_2000 message. Does not implicitly {@link reply_2000.verify|verify} messages.
     * @param message reply_2000 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_2000, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_2000 message, length delimited. Does not implicitly {@link reply_2000.verify|verify} messages.
     * @param message reply_2000 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_2000, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_2000 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_2000
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_2000;

    /**
     * Decodes a reply_2000 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_2000
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_2000;

    /**
     * Verifies a reply_2000 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_2000 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_2000
     */
    public static fromObject(object: { [k: string]: any }): reply_2000;

    /**
     * Creates a plain object from a reply_2000 message. Also converts values to other types if specified.
     * @param message reply_2000
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_2000, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_2000 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_2000
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_2001. */
export class query_2001 implements Iquery_2001 {

    /**
     * Constructs a new query_2001.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_2001);

    /**
     * Creates a new query_2001 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_2001 instance
     */
    public static create(properties?: Iquery_2001): query_2001;

    /**
     * Encodes the specified query_2001 message. Does not implicitly {@link query_2001.verify|verify} messages.
     * @param message query_2001 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_2001, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_2001 message, length delimited. Does not implicitly {@link query_2001.verify|verify} messages.
     * @param message query_2001 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_2001, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_2001 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_2001
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_2001;

    /**
     * Decodes a query_2001 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_2001
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_2001;

    /**
     * Verifies a query_2001 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_2001 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_2001
     */
    public static fromObject(object: { [k: string]: any }): query_2001;

    /**
     * Creates a plain object from a query_2001 message. Also converts values to other types if specified.
     * @param message query_2001
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_2001, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_2001 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_2001
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_2001. */
export class reply_2001 implements Ireply_2001 {

    /**
     * Constructs a new reply_2001.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_2001);

    /** reply_2001 normal_bag. */
    public normal_bag: Inormal_goods[];

    /** reply_2001 equip_bag. */
    public equip_bag: Iequip_goods[];

    /**
     * Creates a new reply_2001 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_2001 instance
     */
    public static create(properties?: Ireply_2001): reply_2001;

    /**
     * Encodes the specified reply_2001 message. Does not implicitly {@link reply_2001.verify|verify} messages.
     * @param message reply_2001 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_2001, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_2001 message, length delimited. Does not implicitly {@link reply_2001.verify|verify} messages.
     * @param message reply_2001 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_2001, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_2001 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_2001
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_2001;

    /**
     * Decodes a reply_2001 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_2001
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_2001;

    /**
     * Verifies a reply_2001 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_2001 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_2001
     */
    public static fromObject(object: { [k: string]: any }): reply_2001;

    /**
     * Creates a plain object from a reply_2001 message. Also converts values to other types if specified.
     * @param message reply_2001
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_2001, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_2001 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_2001
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_2002. */
export class reply_2002 implements Ireply_2002 {

    /**
     * Constructs a new reply_2002.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_2002);

    /** reply_2002 assets. */
    public assets: Iasset[];

    /** reply_2002 normal_bag. */
    public normal_bag: Inormal_goods[];

    /** reply_2002 equip_bag. */
    public equip_bag: Iequip_goods[];

    /** reply_2002 goods_show_list. */
    public goods_show_list: Igoods_show[];

    /** reply_2002 goods_from. */
    public goods_from: number;

    /**
     * Creates a new reply_2002 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_2002 instance
     */
    public static create(properties?: Ireply_2002): reply_2002;

    /**
     * Encodes the specified reply_2002 message. Does not implicitly {@link reply_2002.verify|verify} messages.
     * @param message reply_2002 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_2002, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_2002 message, length delimited. Does not implicitly {@link reply_2002.verify|verify} messages.
     * @param message reply_2002 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_2002, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_2002 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_2002
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_2002;

    /**
     * Decodes a reply_2002 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_2002
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_2002;

    /**
     * Verifies a reply_2002 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_2002 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_2002
     */
    public static fromObject(object: { [k: string]: any }): reply_2002;

    /**
     * Creates a plain object from a reply_2002 message. Also converts values to other types if specified.
     * @param message reply_2002
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_2002, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_2002 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_2002
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_2003. */
export class reply_2003 implements Ireply_2003 {

    /**
     * Constructs a new reply_2003.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_2003);

    /** reply_2003 assets. */
    public assets: Iasset[];

    /** reply_2003 normal_bag. */
    public normal_bag: Inormal_goods[];

    /** reply_2003 equip_bag. */
    public equip_bag: Iequip_goods[];

    /**
     * Creates a new reply_2003 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_2003 instance
     */
    public static create(properties?: Ireply_2003): reply_2003;

    /**
     * Encodes the specified reply_2003 message. Does not implicitly {@link reply_2003.verify|verify} messages.
     * @param message reply_2003 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_2003, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_2003 message, length delimited. Does not implicitly {@link reply_2003.verify|verify} messages.
     * @param message reply_2003 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_2003, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_2003 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_2003
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_2003;

    /**
     * Decodes a reply_2003 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_2003
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_2003;

    /**
     * Verifies a reply_2003 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_2003 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_2003
     */
    public static fromObject(object: { [k: string]: any }): reply_2003;

    /**
     * Creates a plain object from a reply_2003 message. Also converts values to other types if specified.
     * @param message reply_2003
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_2003, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_2003 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_2003
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_2011. */
export class query_2011 implements Iquery_2011 {

    /**
     * Constructs a new query_2011.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_2011);

    /** query_2011 guid. */
    public guid: string;

    /** query_2011 goods_id. */
    public goods_id: number;

    /** query_2011 num. */
    public num: number;

    /** query_2011 manual_use_list. */
    public manual_use_list: Icommon_key_value[];

    /**
     * Creates a new query_2011 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_2011 instance
     */
    public static create(properties?: Iquery_2011): query_2011;

    /**
     * Encodes the specified query_2011 message. Does not implicitly {@link query_2011.verify|verify} messages.
     * @param message query_2011 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_2011, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_2011 message, length delimited. Does not implicitly {@link query_2011.verify|verify} messages.
     * @param message query_2011 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_2011, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_2011 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_2011
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_2011;

    /**
     * Decodes a query_2011 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_2011
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_2011;

    /**
     * Verifies a query_2011 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_2011 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_2011
     */
    public static fromObject(object: { [k: string]: any }): query_2011;

    /**
     * Creates a plain object from a query_2011 message. Also converts values to other types if specified.
     * @param message query_2011
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_2011, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_2011 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_2011
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_2011. */
export class reply_2011 implements Ireply_2011 {

    /**
     * Constructs a new reply_2011.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_2011);

    /** reply_2011 status. */
    public status: number;

    /** reply_2011 message. */
    public message: string;

    /**
     * Creates a new reply_2011 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_2011 instance
     */
    public static create(properties?: Ireply_2011): reply_2011;

    /**
     * Encodes the specified reply_2011 message. Does not implicitly {@link reply_2011.verify|verify} messages.
     * @param message reply_2011 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_2011, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_2011 message, length delimited. Does not implicitly {@link reply_2011.verify|verify} messages.
     * @param message reply_2011 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_2011, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_2011 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_2011
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_2011;

    /**
     * Decodes a reply_2011 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_2011
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_2011;

    /**
     * Verifies a reply_2011 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_2011 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_2011
     */
    public static fromObject(object: { [k: string]: any }): reply_2011;

    /**
     * Creates a plain object from a reply_2011 message. Also converts values to other types if specified.
     * @param message reply_2011
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_2011, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_2011 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_2011
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_2012. */
export class query_2012 implements Iquery_2012 {

    /**
     * Constructs a new query_2012.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_2012);

    /** query_2012 goods_guid_list. */
    public goods_guid_list: Icommon_keystr_value2[];

    /**
     * Creates a new query_2012 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_2012 instance
     */
    public static create(properties?: Iquery_2012): query_2012;

    /**
     * Encodes the specified query_2012 message. Does not implicitly {@link query_2012.verify|verify} messages.
     * @param message query_2012 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_2012, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_2012 message, length delimited. Does not implicitly {@link query_2012.verify|verify} messages.
     * @param message query_2012 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_2012, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_2012 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_2012
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_2012;

    /**
     * Decodes a query_2012 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_2012
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_2012;

    /**
     * Verifies a query_2012 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_2012 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_2012
     */
    public static fromObject(object: { [k: string]: any }): query_2012;

    /**
     * Creates a plain object from a query_2012 message. Also converts values to other types if specified.
     * @param message query_2012
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_2012, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_2012 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_2012
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_2012. */
export class reply_2012 implements Ireply_2012 {

    /**
     * Constructs a new reply_2012.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_2012);

    /** reply_2012 status. */
    public status: number;

    /** reply_2012 message. */
    public message: string;

    /**
     * Creates a new reply_2012 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_2012 instance
     */
    public static create(properties?: Ireply_2012): reply_2012;

    /**
     * Encodes the specified reply_2012 message. Does not implicitly {@link reply_2012.verify|verify} messages.
     * @param message reply_2012 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_2012, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_2012 message, length delimited. Does not implicitly {@link reply_2012.verify|verify} messages.
     * @param message reply_2012 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_2012, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_2012 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_2012
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_2012;

    /**
     * Decodes a reply_2012 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_2012
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_2012;

    /**
     * Verifies a reply_2012 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_2012 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_2012
     */
    public static fromObject(object: { [k: string]: any }): reply_2012;

    /**
     * Creates a plain object from a reply_2012 message. Also converts values to other types if specified.
     * @param message reply_2012
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_2012, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_2012 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_2012
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_2013. */
export class query_2013 implements Iquery_2013 {

    /**
     * Constructs a new query_2013.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_2013);

    /**
     * Creates a new query_2013 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_2013 instance
     */
    public static create(properties?: Iquery_2013): query_2013;

    /**
     * Encodes the specified query_2013 message. Does not implicitly {@link query_2013.verify|verify} messages.
     * @param message query_2013 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_2013, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_2013 message, length delimited. Does not implicitly {@link query_2013.verify|verify} messages.
     * @param message query_2013 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_2013, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_2013 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_2013
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_2013;

    /**
     * Decodes a query_2013 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_2013
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_2013;

    /**
     * Verifies a query_2013 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_2013 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_2013
     */
    public static fromObject(object: { [k: string]: any }): query_2013;

    /**
     * Creates a plain object from a query_2013 message. Also converts values to other types if specified.
     * @param message query_2013
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_2013, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_2013 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_2013
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_2013. */
export class reply_2013 implements Ireply_2013 {

    /**
     * Constructs a new reply_2013.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_2013);

    /** reply_2013 status. */
    public status: number;

    /** reply_2013 message. */
    public message: string;

    /**
     * Creates a new reply_2013 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_2013 instance
     */
    public static create(properties?: Ireply_2013): reply_2013;

    /**
     * Encodes the specified reply_2013 message. Does not implicitly {@link reply_2013.verify|verify} messages.
     * @param message reply_2013 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_2013, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_2013 message, length delimited. Does not implicitly {@link reply_2013.verify|verify} messages.
     * @param message reply_2013 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_2013, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_2013 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_2013
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_2013;

    /**
     * Decodes a reply_2013 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_2013
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_2013;

    /**
     * Verifies a reply_2013 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_2013 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_2013
     */
    public static fromObject(object: { [k: string]: any }): reply_2013;

    /**
     * Creates a plain object from a reply_2013 message. Also converts values to other types if specified.
     * @param message reply_2013
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_2013, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_2013 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_2013
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_100001. */
export class query_100001 implements Iquery_100001 {

    /**
     * Constructs a new query_100001.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_100001);

    /**
     * Creates a new query_100001 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_100001 instance
     */
    public static create(properties?: Iquery_100001): query_100001;

    /**
     * Encodes the specified query_100001 message. Does not implicitly {@link query_100001.verify|verify} messages.
     * @param message query_100001 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_100001, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_100001 message, length delimited. Does not implicitly {@link query_100001.verify|verify} messages.
     * @param message query_100001 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_100001, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_100001 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_100001
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_100001;

    /**
     * Decodes a query_100001 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_100001
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_100001;

    /**
     * Verifies a query_100001 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_100001 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_100001
     */
    public static fromObject(object: { [k: string]: any }): query_100001;

    /**
     * Creates a plain object from a query_100001 message. Also converts values to other types if specified.
     * @param message query_100001
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_100001, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_100001 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_100001
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_100001. */
export class reply_100001 implements Ireply_100001 {

    /**
     * Constructs a new reply_100001.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_100001);

    /** reply_100001 subject_list. */
    public subject_list: Imail_subject[];

    /**
     * Creates a new reply_100001 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_100001 instance
     */
    public static create(properties?: Ireply_100001): reply_100001;

    /**
     * Encodes the specified reply_100001 message. Does not implicitly {@link reply_100001.verify|verify} messages.
     * @param message reply_100001 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_100001, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_100001 message, length delimited. Does not implicitly {@link reply_100001.verify|verify} messages.
     * @param message reply_100001 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_100001, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_100001 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_100001
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_100001;

    /**
     * Decodes a reply_100001 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_100001
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_100001;

    /**
     * Verifies a reply_100001 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_100001 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_100001
     */
    public static fromObject(object: { [k: string]: any }): reply_100001;

    /**
     * Creates a plain object from a reply_100001 message. Also converts values to other types if specified.
     * @param message reply_100001
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_100001, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_100001 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_100001
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a mail_subject. */
export class mail_subject implements Imail_subject {

    /**
     * Constructs a new mail_subject.
     * @param [properties] Properties to set
     */
    constructor(properties?: Imail_subject);

    /** mail_subject guid. */
    public guid: string;

    /** mail_subject from_name. */
    public from_name: string;

    /** mail_subject read_status. */
    public read_status: number;

    /** mail_subject subject. */
    public subject: string;

    /** mail_subject items. */
    public items: Imail_item[];

    /** mail_subject send_timestamp. */
    public send_timestamp: number;

    /** mail_subject expire_timestamp. */
    public expire_timestamp: number;

    /** mail_subject subject2. */
    public subject2: string;

    /**
     * Creates a new mail_subject instance using the specified properties.
     * @param [properties] Properties to set
     * @returns mail_subject instance
     */
    public static create(properties?: Imail_subject): mail_subject;

    /**
     * Encodes the specified mail_subject message. Does not implicitly {@link mail_subject.verify|verify} messages.
     * @param message mail_subject message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Imail_subject, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified mail_subject message, length delimited. Does not implicitly {@link mail_subject.verify|verify} messages.
     * @param message mail_subject message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Imail_subject, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a mail_subject message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns mail_subject
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mail_subject;

    /**
     * Decodes a mail_subject message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns mail_subject
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mail_subject;

    /**
     * Verifies a mail_subject message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a mail_subject message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns mail_subject
     */
    public static fromObject(object: { [k: string]: any }): mail_subject;

    /**
     * Creates a plain object from a mail_subject message. Also converts values to other types if specified.
     * @param message mail_subject
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: mail_subject, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this mail_subject to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for mail_subject
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_100002. */
export class query_100002 implements Iquery_100002 {

    /**
     * Constructs a new query_100002.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_100002);

    /** query_100002 guid. */
    public guid: string;

    /**
     * Creates a new query_100002 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_100002 instance
     */
    public static create(properties?: Iquery_100002): query_100002;

    /**
     * Encodes the specified query_100002 message. Does not implicitly {@link query_100002.verify|verify} messages.
     * @param message query_100002 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_100002, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_100002 message, length delimited. Does not implicitly {@link query_100002.verify|verify} messages.
     * @param message query_100002 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_100002, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_100002 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_100002
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_100002;

    /**
     * Decodes a query_100002 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_100002
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_100002;

    /**
     * Verifies a query_100002 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_100002 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_100002
     */
    public static fromObject(object: { [k: string]: any }): query_100002;

    /**
     * Creates a plain object from a query_100002 message. Also converts values to other types if specified.
     * @param message query_100002
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_100002, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_100002 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_100002
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_100002. */
export class reply_100002 implements Ireply_100002 {

    /**
     * Constructs a new reply_100002.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_100002);

    /** reply_100002 guid. */
    public guid: string;

    /** reply_100002 from_name. */
    public from_name: string;

    /** reply_100002 read_status. */
    public read_status: number;

    /** reply_100002 subject. */
    public subject: string;

    /** reply_100002 content. */
    public content: string;

    /** reply_100002 items. */
    public items: Imail_item[];

    /** reply_100002 send_timestamp. */
    public send_timestamp: number;

    /** reply_100002 expire_timestamp. */
    public expire_timestamp: number;

    /** reply_100002 subject2. */
    public subject2: string;

    /**
     * Creates a new reply_100002 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_100002 instance
     */
    public static create(properties?: Ireply_100002): reply_100002;

    /**
     * Encodes the specified reply_100002 message. Does not implicitly {@link reply_100002.verify|verify} messages.
     * @param message reply_100002 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_100002, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_100002 message, length delimited. Does not implicitly {@link reply_100002.verify|verify} messages.
     * @param message reply_100002 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_100002, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_100002 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_100002
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_100002;

    /**
     * Decodes a reply_100002 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_100002
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_100002;

    /**
     * Verifies a reply_100002 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_100002 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_100002
     */
    public static fromObject(object: { [k: string]: any }): reply_100002;

    /**
     * Creates a plain object from a reply_100002 message. Also converts values to other types if specified.
     * @param message reply_100002
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_100002, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_100002 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_100002
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a mail_item. */
export class mail_item implements Imail_item {

    /**
     * Constructs a new mail_item.
     * @param [properties] Properties to set
     */
    constructor(properties?: Imail_item);

    /** mail_item id. */
    public id: number;

    /** mail_item num. */
    public num: number;

    /**
     * Creates a new mail_item instance using the specified properties.
     * @param [properties] Properties to set
     * @returns mail_item instance
     */
    public static create(properties?: Imail_item): mail_item;

    /**
     * Encodes the specified mail_item message. Does not implicitly {@link mail_item.verify|verify} messages.
     * @param message mail_item message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Imail_item, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified mail_item message, length delimited. Does not implicitly {@link mail_item.verify|verify} messages.
     * @param message mail_item message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Imail_item, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a mail_item message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns mail_item
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mail_item;

    /**
     * Decodes a mail_item message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns mail_item
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mail_item;

    /**
     * Verifies a mail_item message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a mail_item message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns mail_item
     */
    public static fromObject(object: { [k: string]: any }): mail_item;

    /**
     * Creates a plain object from a mail_item message. Also converts values to other types if specified.
     * @param message mail_item
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: mail_item, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this mail_item to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for mail_item
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_100003. */
export class query_100003 implements Iquery_100003 {

    /**
     * Constructs a new query_100003.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_100003);

    /** query_100003 guid. */
    public guid: string;

    /**
     * Creates a new query_100003 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_100003 instance
     */
    public static create(properties?: Iquery_100003): query_100003;

    /**
     * Encodes the specified query_100003 message. Does not implicitly {@link query_100003.verify|verify} messages.
     * @param message query_100003 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_100003, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_100003 message, length delimited. Does not implicitly {@link query_100003.verify|verify} messages.
     * @param message query_100003 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_100003, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_100003 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_100003
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_100003;

    /**
     * Decodes a query_100003 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_100003
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_100003;

    /**
     * Verifies a query_100003 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_100003 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_100003
     */
    public static fromObject(object: { [k: string]: any }): query_100003;

    /**
     * Creates a plain object from a query_100003 message. Also converts values to other types if specified.
     * @param message query_100003
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_100003, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_100003 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_100003
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_100003. */
export class reply_100003 implements Ireply_100003 {

    /**
     * Constructs a new reply_100003.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_100003);

    /** reply_100003 status. */
    public status: number;

    /** reply_100003 message. */
    public message: string;

    /** reply_100003 mail_subject. */
    public mail_subject?: (Imail_subject|null);

    /**
     * Creates a new reply_100003 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_100003 instance
     */
    public static create(properties?: Ireply_100003): reply_100003;

    /**
     * Encodes the specified reply_100003 message. Does not implicitly {@link reply_100003.verify|verify} messages.
     * @param message reply_100003 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_100003, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_100003 message, length delimited. Does not implicitly {@link reply_100003.verify|verify} messages.
     * @param message reply_100003 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_100003, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_100003 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_100003
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_100003;

    /**
     * Decodes a reply_100003 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_100003
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_100003;

    /**
     * Verifies a reply_100003 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_100003 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_100003
     */
    public static fromObject(object: { [k: string]: any }): reply_100003;

    /**
     * Creates a plain object from a reply_100003 message. Also converts values to other types if specified.
     * @param message reply_100003
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_100003, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_100003 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_100003
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_100004. */
export class query_100004 implements Iquery_100004 {

    /**
     * Constructs a new query_100004.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_100004);

    /**
     * Creates a new query_100004 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_100004 instance
     */
    public static create(properties?: Iquery_100004): query_100004;

    /**
     * Encodes the specified query_100004 message. Does not implicitly {@link query_100004.verify|verify} messages.
     * @param message query_100004 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_100004, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_100004 message, length delimited. Does not implicitly {@link query_100004.verify|verify} messages.
     * @param message query_100004 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_100004, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_100004 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_100004
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_100004;

    /**
     * Decodes a query_100004 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_100004
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_100004;

    /**
     * Verifies a query_100004 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_100004 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_100004
     */
    public static fromObject(object: { [k: string]: any }): query_100004;

    /**
     * Creates a plain object from a query_100004 message. Also converts values to other types if specified.
     * @param message query_100004
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_100004, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_100004 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_100004
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_100004. */
export class reply_100004 implements Ireply_100004 {

    /**
     * Constructs a new reply_100004.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_100004);

    /** reply_100004 status. */
    public status: number;

    /** reply_100004 message. */
    public message: string;

    /** reply_100004 mail_subject_list. */
    public mail_subject_list: Imail_subject[];

    /**
     * Creates a new reply_100004 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_100004 instance
     */
    public static create(properties?: Ireply_100004): reply_100004;

    /**
     * Encodes the specified reply_100004 message. Does not implicitly {@link reply_100004.verify|verify} messages.
     * @param message reply_100004 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_100004, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_100004 message, length delimited. Does not implicitly {@link reply_100004.verify|verify} messages.
     * @param message reply_100004 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_100004, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_100004 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_100004
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_100004;

    /**
     * Decodes a reply_100004 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_100004
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_100004;

    /**
     * Verifies a reply_100004 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_100004 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_100004
     */
    public static fromObject(object: { [k: string]: any }): reply_100004;

    /**
     * Creates a plain object from a reply_100004 message. Also converts values to other types if specified.
     * @param message reply_100004
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_100004, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_100004 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_100004
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_100005. */
export class query_100005 implements Iquery_100005 {

    /**
     * Constructs a new query_100005.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_100005);

    /**
     * Creates a new query_100005 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_100005 instance
     */
    public static create(properties?: Iquery_100005): query_100005;

    /**
     * Encodes the specified query_100005 message. Does not implicitly {@link query_100005.verify|verify} messages.
     * @param message query_100005 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_100005, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_100005 message, length delimited. Does not implicitly {@link query_100005.verify|verify} messages.
     * @param message query_100005 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_100005, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_100005 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_100005
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_100005;

    /**
     * Decodes a query_100005 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_100005
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_100005;

    /**
     * Verifies a query_100005 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_100005 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_100005
     */
    public static fromObject(object: { [k: string]: any }): query_100005;

    /**
     * Creates a plain object from a query_100005 message. Also converts values to other types if specified.
     * @param message query_100005
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_100005, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_100005 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_100005
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_100005. */
export class reply_100005 implements Ireply_100005 {

    /**
     * Constructs a new reply_100005.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_100005);

    /** reply_100005 status. */
    public status: number;

    /** reply_100005 message. */
    public message: string;

    /** reply_100005 del_guids. */
    public del_guids: string[];

    /**
     * Creates a new reply_100005 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_100005 instance
     */
    public static create(properties?: Ireply_100005): reply_100005;

    /**
     * Encodes the specified reply_100005 message. Does not implicitly {@link reply_100005.verify|verify} messages.
     * @param message reply_100005 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_100005, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_100005 message, length delimited. Does not implicitly {@link reply_100005.verify|verify} messages.
     * @param message reply_100005 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_100005, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_100005 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_100005
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_100005;

    /**
     * Decodes a reply_100005 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_100005
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_100005;

    /**
     * Verifies a reply_100005 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_100005 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_100005
     */
    public static fromObject(object: { [k: string]: any }): reply_100005;

    /**
     * Creates a plain object from a reply_100005 message. Also converts values to other types if specified.
     * @param message reply_100005
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_100005, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_100005 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_100005
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_100006. */
export class query_100006 implements Iquery_100006 {

    /**
     * Constructs a new query_100006.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_100006);

    /** query_100006 guid. */
    public guid: string;

    /**
     * Creates a new query_100006 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_100006 instance
     */
    public static create(properties?: Iquery_100006): query_100006;

    /**
     * Encodes the specified query_100006 message. Does not implicitly {@link query_100006.verify|verify} messages.
     * @param message query_100006 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_100006, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_100006 message, length delimited. Does not implicitly {@link query_100006.verify|verify} messages.
     * @param message query_100006 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_100006, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_100006 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_100006
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_100006;

    /**
     * Decodes a query_100006 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_100006
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_100006;

    /**
     * Verifies a query_100006 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_100006 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_100006
     */
    public static fromObject(object: { [k: string]: any }): query_100006;

    /**
     * Creates a plain object from a query_100006 message. Also converts values to other types if specified.
     * @param message query_100006
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_100006, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_100006 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_100006
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_100006. */
export class reply_100006 implements Ireply_100006 {

    /**
     * Constructs a new reply_100006.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_100006);

    /** reply_100006 status. */
    public status: number;

    /** reply_100006 message. */
    public message: string;

    /** reply_100006 guid. */
    public guid: string;

    /**
     * Creates a new reply_100006 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_100006 instance
     */
    public static create(properties?: Ireply_100006): reply_100006;

    /**
     * Encodes the specified reply_100006 message. Does not implicitly {@link reply_100006.verify|verify} messages.
     * @param message reply_100006 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_100006, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_100006 message, length delimited. Does not implicitly {@link reply_100006.verify|verify} messages.
     * @param message reply_100006 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_100006, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_100006 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_100006
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_100006;

    /**
     * Decodes a reply_100006 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_100006
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_100006;

    /**
     * Verifies a reply_100006 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_100006 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_100006
     */
    public static fromObject(object: { [k: string]: any }): reply_100006;

    /**
     * Creates a plain object from a reply_100006 message. Also converts values to other types if specified.
     * @param message reply_100006
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_100006, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_100006 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_100006
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_100007. */
export class query_100007 implements Iquery_100007 {

    /**
     * Constructs a new query_100007.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_100007);

    /**
     * Creates a new query_100007 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_100007 instance
     */
    public static create(properties?: Iquery_100007): query_100007;

    /**
     * Encodes the specified query_100007 message. Does not implicitly {@link query_100007.verify|verify} messages.
     * @param message query_100007 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_100007, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_100007 message, length delimited. Does not implicitly {@link query_100007.verify|verify} messages.
     * @param message query_100007 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_100007, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_100007 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_100007
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_100007;

    /**
     * Decodes a query_100007 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_100007
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_100007;

    /**
     * Verifies a query_100007 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_100007 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_100007
     */
    public static fromObject(object: { [k: string]: any }): query_100007;

    /**
     * Creates a plain object from a query_100007 message. Also converts values to other types if specified.
     * @param message query_100007
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_100007, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_100007 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_100007
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_100008. */
export class reply_100008 implements Ireply_100008 {

    /**
     * Constructs a new reply_100008.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_100008);

    /** reply_100008 new_mail. */
    public new_mail?: (Imail_subject|null);

    /**
     * Creates a new reply_100008 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_100008 instance
     */
    public static create(properties?: Ireply_100008): reply_100008;

    /**
     * Encodes the specified reply_100008 message. Does not implicitly {@link reply_100008.verify|verify} messages.
     * @param message reply_100008 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_100008, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_100008 message, length delimited. Does not implicitly {@link reply_100008.verify|verify} messages.
     * @param message reply_100008 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_100008, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_100008 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_100008
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_100008;

    /**
     * Decodes a reply_100008 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_100008
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_100008;

    /**
     * Verifies a reply_100008 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_100008 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_100008
     */
    public static fromObject(object: { [k: string]: any }): reply_100008;

    /**
     * Creates a plain object from a reply_100008 message. Also converts values to other types if specified.
     * @param message reply_100008
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_100008, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_100008 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_100008
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a player_base. */
export class player_base implements Iplayer_base {

    /**
     * Constructs a new player_base.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iplayer_base);

    /** player_base player_id. */
    public player_id: number;

    /** player_base srvno. */
    public srvno: string;

    /** player_base nickname. */
    public nickname: string;

    /** player_base nickname_change_num. */
    public nickname_change_num: number;

    /** player_base ref_code. */
    public ref_code: string;

    /** player_base head_id. */
    public head_id: number;

    /** player_base head_border. */
    public head_border: number;

    /** player_base figure. */
    public figure: number;

    /** player_base color. */
    public color: number;

    /** player_base designation. */
    public designation: number;

    /** player_base realm. */
    public realm: number;

    /** player_base sex. */
    public sex: number;

    /** player_base lv. */
    public lv: number;

    /** player_base exp. */
    public exp: (number|Long);

    /** player_base power. */
    public power: number;

    /** player_base max_power. */
    public max_power: number;

    /** player_base capacity. */
    public capacity: number;

    /** player_base vip. */
    public vip: number;

    /** player_base gold_acc. */
    public gold_acc: number;

    /** player_base money. */
    public money: number;

    /** player_base speak_banned_time. */
    public speak_banned_time: number;

    /** player_base id_banned_time. */
    public id_banned_time: number;

    /** player_base last_login_time. */
    public last_login_time: number;

    /** player_base last_logout_time. */
    public last_logout_time: number;

    /** player_base cur_grade. */
    public cur_grade: number;

    /** player_base history_max_grade. */
    public history_max_grade: number;

    /** player_base total_victory_num. */
    public total_victory_num: number;

    /** player_base total_defeated_num. */
    public total_defeated_num: number;

    /** player_base total_draw_num. */
    public total_draw_num: number;

    /** player_base fame_lock_status. */
    public fame_lock_status: number;

    /** player_base arena_ranking. */
    public arena_ranking: number;

    /** player_base vip_exp. */
    public vip_exp: number;

    /**
     * Creates a new player_base instance using the specified properties.
     * @param [properties] Properties to set
     * @returns player_base instance
     */
    public static create(properties?: Iplayer_base): player_base;

    /**
     * Encodes the specified player_base message. Does not implicitly {@link player_base.verify|verify} messages.
     * @param message player_base message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iplayer_base, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified player_base message, length delimited. Does not implicitly {@link player_base.verify|verify} messages.
     * @param message player_base message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iplayer_base, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a player_base message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns player_base
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): player_base;

    /**
     * Decodes a player_base message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns player_base
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): player_base;

    /**
     * Verifies a player_base message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a player_base message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns player_base
     */
    public static fromObject(object: { [k: string]: any }): player_base;

    /**
     * Creates a plain object from a player_base message. Also converts values to other types if specified.
     * @param message player_base
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: player_base, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this player_base to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for player_base
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a guide_process. */
export class guide_process implements Iguide_process {

    /**
     * Constructs a new guide_process.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iguide_process);

    /** guide_process version. */
    public version: number;

    /** guide_process guide_id. */
    public guide_id: number;

    /** guide_process step_id. */
    public step_id: number;

    /**
     * Creates a new guide_process instance using the specified properties.
     * @param [properties] Properties to set
     * @returns guide_process instance
     */
    public static create(properties?: Iguide_process): guide_process;

    /**
     * Encodes the specified guide_process message. Does not implicitly {@link guide_process.verify|verify} messages.
     * @param message guide_process message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iguide_process, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified guide_process message, length delimited. Does not implicitly {@link guide_process.verify|verify} messages.
     * @param message guide_process message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iguide_process, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a guide_process message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns guide_process
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): guide_process;

    /**
     * Decodes a guide_process message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns guide_process
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): guide_process;

    /**
     * Verifies a guide_process message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a guide_process message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns guide_process
     */
    public static fromObject(object: { [k: string]: any }): guide_process;

    /**
     * Creates a plain object from a guide_process message. Also converts values to other types if specified.
     * @param message guide_process
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: guide_process, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this guide_process to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for guide_process
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_200. */
export class query_200 implements Iquery_200 {

    /**
     * Constructs a new query_200.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_200);

    /** query_200 cmd. */
    public cmd: string;

    /**
     * Creates a new query_200 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_200 instance
     */
    public static create(properties?: Iquery_200): query_200;

    /**
     * Encodes the specified query_200 message. Does not implicitly {@link query_200.verify|verify} messages.
     * @param message query_200 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_200, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_200 message, length delimited. Does not implicitly {@link query_200.verify|verify} messages.
     * @param message query_200 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_200, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_200 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_200
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_200;

    /**
     * Decodes a query_200 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_200
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_200;

    /**
     * Verifies a query_200 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_200 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_200
     */
    public static fromObject(object: { [k: string]: any }): query_200;

    /**
     * Creates a plain object from a query_200 message. Also converts values to other types if specified.
     * @param message query_200
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_200, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_200 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_200
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_200. */
export class reply_200 implements Ireply_200 {

    /**
     * Constructs a new reply_200.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_200);

    /** reply_200 status. */
    public status: number;

    /** reply_200 message. */
    public message: string;

    /**
     * Creates a new reply_200 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_200 instance
     */
    public static create(properties?: Ireply_200): reply_200;

    /**
     * Encodes the specified reply_200 message. Does not implicitly {@link reply_200.verify|verify} messages.
     * @param message reply_200 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_200, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_200 message, length delimited. Does not implicitly {@link reply_200.verify|verify} messages.
     * @param message reply_200 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_200, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_200 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_200
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_200;

    /**
     * Decodes a reply_200 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_200
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_200;

    /**
     * Verifies a reply_200 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_200 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_200
     */
    public static fromObject(object: { [k: string]: any }): reply_200;

    /**
     * Creates a plain object from a reply_200 message. Also converts values to other types if specified.
     * @param message reply_200
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_200, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_200 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_200
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_201. */
export class reply_201 implements Ireply_201 {

    /**
     * Constructs a new reply_201.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_201);

    /** reply_201 message. */
    public message: string;

    /**
     * Creates a new reply_201 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_201 instance
     */
    public static create(properties?: Ireply_201): reply_201;

    /**
     * Encodes the specified reply_201 message. Does not implicitly {@link reply_201.verify|verify} messages.
     * @param message reply_201 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_201, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_201 message, length delimited. Does not implicitly {@link reply_201.verify|verify} messages.
     * @param message reply_201 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_201, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_201 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_201
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_201;

    /**
     * Decodes a reply_201 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_201
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_201;

    /**
     * Verifies a reply_201 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_201 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_201
     */
    public static fromObject(object: { [k: string]: any }): reply_201;

    /**
     * Creates a plain object from a reply_201 message. Also converts values to other types if specified.
     * @param message reply_201
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_201, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_201 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_201
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_204. */
export class query_204 implements Iquery_204 {

    /**
     * Constructs a new query_204.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_204);

    /**
     * Creates a new query_204 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_204 instance
     */
    public static create(properties?: Iquery_204): query_204;

    /**
     * Encodes the specified query_204 message. Does not implicitly {@link query_204.verify|verify} messages.
     * @param message query_204 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_204, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_204 message, length delimited. Does not implicitly {@link query_204.verify|verify} messages.
     * @param message query_204 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_204, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_204 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_204
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_204;

    /**
     * Decodes a query_204 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_204
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_204;

    /**
     * Verifies a query_204 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_204 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_204
     */
    public static fromObject(object: { [k: string]: any }): query_204;

    /**
     * Creates a plain object from a query_204 message. Also converts values to other types if specified.
     * @param message query_204
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_204, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_204 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_204
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_205. */
export class query_205 implements Iquery_205 {

    /**
     * Constructs a new query_205.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_205);

    /**
     * Creates a new query_205 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_205 instance
     */
    public static create(properties?: Iquery_205): query_205;

    /**
     * Encodes the specified query_205 message. Does not implicitly {@link query_205.verify|verify} messages.
     * @param message query_205 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_205, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_205 message, length delimited. Does not implicitly {@link query_205.verify|verify} messages.
     * @param message query_205 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_205, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_205 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_205
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_205;

    /**
     * Decodes a query_205 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_205
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_205;

    /**
     * Verifies a query_205 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_205 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_205
     */
    public static fromObject(object: { [k: string]: any }): query_205;

    /**
     * Creates a plain object from a query_205 message. Also converts values to other types if specified.
     * @param message query_205
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_205, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_205 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_205
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_205. */
export class reply_205 implements Ireply_205 {

    /**
     * Constructs a new reply_205.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_205);

    /** reply_205 status. */
    public status: number;

    /** reply_205 message. */
    public message: string;

    /**
     * Creates a new reply_205 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_205 instance
     */
    public static create(properties?: Ireply_205): reply_205;

    /**
     * Encodes the specified reply_205 message. Does not implicitly {@link reply_205.verify|verify} messages.
     * @param message reply_205 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_205, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_205 message, length delimited. Does not implicitly {@link reply_205.verify|verify} messages.
     * @param message reply_205 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_205, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_205 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_205
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_205;

    /**
     * Decodes a reply_205 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_205
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_205;

    /**
     * Verifies a reply_205 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_205 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_205
     */
    public static fromObject(object: { [k: string]: any }): reply_205;

    /**
     * Creates a plain object from a reply_205 message. Also converts values to other types if specified.
     * @param message reply_205
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_205, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_205 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_205
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_206. */
export class query_206 implements Iquery_206 {

    /**
     * Constructs a new query_206.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_206);

    /** query_206 nick_name. */
    public nick_name: string;

    /**
     * Creates a new query_206 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_206 instance
     */
    public static create(properties?: Iquery_206): query_206;

    /**
     * Encodes the specified query_206 message. Does not implicitly {@link query_206.verify|verify} messages.
     * @param message query_206 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_206, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_206 message, length delimited. Does not implicitly {@link query_206.verify|verify} messages.
     * @param message query_206 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_206, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_206 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_206
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_206;

    /**
     * Decodes a query_206 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_206
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_206;

    /**
     * Verifies a query_206 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_206 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_206
     */
    public static fromObject(object: { [k: string]: any }): query_206;

    /**
     * Creates a plain object from a query_206 message. Also converts values to other types if specified.
     * @param message query_206
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_206, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_206 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_206
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_206. */
export class reply_206 implements Ireply_206 {

    /**
     * Constructs a new reply_206.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_206);

    /** reply_206 status. */
    public status: number;

    /** reply_206 message. */
    public message: string;

    /** reply_206 nick_name. */
    public nick_name: string;

    /** reply_206 nickname_change_num. */
    public nickname_change_num: number;

    /**
     * Creates a new reply_206 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_206 instance
     */
    public static create(properties?: Ireply_206): reply_206;

    /**
     * Encodes the specified reply_206 message. Does not implicitly {@link reply_206.verify|verify} messages.
     * @param message reply_206 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_206, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_206 message, length delimited. Does not implicitly {@link reply_206.verify|verify} messages.
     * @param message reply_206 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_206, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_206 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_206
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_206;

    /**
     * Decodes a reply_206 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_206
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_206;

    /**
     * Verifies a reply_206 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_206 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_206
     */
    public static fromObject(object: { [k: string]: any }): reply_206;

    /**
     * Creates a plain object from a reply_206 message. Also converts values to other types if specified.
     * @param message reply_206
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_206, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_206 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_206
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_207. */
export class query_207 implements Iquery_207 {

    /**
     * Constructs a new query_207.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_207);

    /**
     * Creates a new query_207 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_207 instance
     */
    public static create(properties?: Iquery_207): query_207;

    /**
     * Encodes the specified query_207 message. Does not implicitly {@link query_207.verify|verify} messages.
     * @param message query_207 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_207, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_207 message, length delimited. Does not implicitly {@link query_207.verify|verify} messages.
     * @param message query_207 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_207, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_207 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_207
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_207;

    /**
     * Decodes a query_207 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_207
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_207;

    /**
     * Verifies a query_207 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_207 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_207
     */
    public static fromObject(object: { [k: string]: any }): query_207;

    /**
     * Creates a plain object from a query_207 message. Also converts values to other types if specified.
     * @param message query_207
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_207, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_207 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_207
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_207. */
export class reply_207 implements Ireply_207 {

    /**
     * Constructs a new reply_207.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_207);

    /** reply_207 base_info. */
    public base_info?: (Iplayer_base|null);

    /** reply_207 assets. */
    public assets: Iasset[];

    /** reply_207 normal_bag. */
    public normal_bag: Inormal_goods[];

    /** reply_207 equip_bag. */
    public equip_bag: Iequip_goods[];

    /** reply_207 guide_id_list. */
    public guide_id_list: number[];

    /** reply_207 guild_guid. */
    public guild_guid: string;

    /** reply_207 war_pass_id. */
    public war_pass_id: number;

    /** reply_207 city_skin_id. */
    public city_skin_id: number;

    /** reply_207 special_lost_return_num. */
    public special_lost_return_num: number;

    /** reply_207 special_refresh_num_300003. */
    public special_refresh_num_300003: number;

    /** reply_207 special_refresh_num_300004. */
    public special_refresh_num_300004: number;

    /** reply_207 special_refresh_num_300005. */
    public special_refresh_num_300005: number;

    /** reply_207 open_server_time. */
    public open_server_time: number;

    /** reply_207 last_change_name_time. */
    public last_change_name_time: number;

    /** reply_207 answer_id_list. */
    public answer_id_list: number[];

    /**
     * Creates a new reply_207 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_207 instance
     */
    public static create(properties?: Ireply_207): reply_207;

    /**
     * Encodes the specified reply_207 message. Does not implicitly {@link reply_207.verify|verify} messages.
     * @param message reply_207 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_207, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_207 message, length delimited. Does not implicitly {@link reply_207.verify|verify} messages.
     * @param message reply_207 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_207, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_207 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_207
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_207;

    /**
     * Decodes a reply_207 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_207
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_207;

    /**
     * Verifies a reply_207 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_207 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_207
     */
    public static fromObject(object: { [k: string]: any }): reply_207;

    /**
     * Creates a plain object from a reply_207 message. Also converts values to other types if specified.
     * @param message reply_207
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_207, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_207 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_207
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a player_config. */
export class player_config implements Iplayer_config {

    /**
     * Constructs a new player_config.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iplayer_config);

    /** player_config version. */
    public version: number;

    /** player_config is_auto_expel. */
    public is_auto_expel: number;

    /** player_config chat_world_hidden. */
    public chat_world_hidden: number;

    /** player_config chat_cross_hidden. */
    public chat_cross_hidden: number;

    /** player_config chat_guild_hidden. */
    public chat_guild_hidden: number;

    /** player_config chat_system_hidden. */
    public chat_system_hidden: number;

    /** player_config battle_speed. */
    public battle_speed: number;

    /** player_config is_first_pve. */
    public is_first_pve: number;

    /** player_config quality_list. */
    public quality_list: number[];

    /** player_config part_list. */
    public part_list: number[];

    /** player_config status_list. */
    public status_list: number[];

    /**
     * Creates a new player_config instance using the specified properties.
     * @param [properties] Properties to set
     * @returns player_config instance
     */
    public static create(properties?: Iplayer_config): player_config;

    /**
     * Encodes the specified player_config message. Does not implicitly {@link player_config.verify|verify} messages.
     * @param message player_config message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iplayer_config, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified player_config message, length delimited. Does not implicitly {@link player_config.verify|verify} messages.
     * @param message player_config message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iplayer_config, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a player_config message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns player_config
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): player_config;

    /**
     * Decodes a player_config message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns player_config
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): player_config;

    /**
     * Verifies a player_config message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a player_config message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns player_config
     */
    public static fromObject(object: { [k: string]: any }): player_config;

    /**
     * Creates a plain object from a player_config message. Also converts values to other types if specified.
     * @param message player_config
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: player_config, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this player_config to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for player_config
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_208. */
export class query_208 implements Iquery_208 {

    /**
     * Constructs a new query_208.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_208);

    /**
     * Creates a new query_208 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_208 instance
     */
    public static create(properties?: Iquery_208): query_208;

    /**
     * Encodes the specified query_208 message. Does not implicitly {@link query_208.verify|verify} messages.
     * @param message query_208 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_208, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_208 message, length delimited. Does not implicitly {@link query_208.verify|verify} messages.
     * @param message query_208 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_208, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_208 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_208
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_208;

    /**
     * Decodes a query_208 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_208
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_208;

    /**
     * Verifies a query_208 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_208 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_208
     */
    public static fromObject(object: { [k: string]: any }): query_208;

    /**
     * Creates a plain object from a query_208 message. Also converts values to other types if specified.
     * @param message query_208
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_208, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_208 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_208
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_208. */
export class reply_208 implements Ireply_208 {

    /**
     * Constructs a new reply_208.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_208);

    /** reply_208 base_info. */
    public base_info?: (Iplayer_base|null);

    /**
     * Creates a new reply_208 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_208 instance
     */
    public static create(properties?: Ireply_208): reply_208;

    /**
     * Encodes the specified reply_208 message. Does not implicitly {@link reply_208.verify|verify} messages.
     * @param message reply_208 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_208, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_208 message, length delimited. Does not implicitly {@link reply_208.verify|verify} messages.
     * @param message reply_208 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_208, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_208 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_208
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_208;

    /**
     * Decodes a reply_208 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_208
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_208;

    /**
     * Verifies a reply_208 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_208 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_208
     */
    public static fromObject(object: { [k: string]: any }): reply_208;

    /**
     * Creates a plain object from a reply_208 message. Also converts values to other types if specified.
     * @param message reply_208
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_208, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_208 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_208
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_209. */
export class query_209 implements Iquery_209 {

    /**
     * Constructs a new query_209.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_209);

    /**
     * Creates a new query_209 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_209 instance
     */
    public static create(properties?: Iquery_209): query_209;

    /**
     * Encodes the specified query_209 message. Does not implicitly {@link query_209.verify|verify} messages.
     * @param message query_209 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_209, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_209 message, length delimited. Does not implicitly {@link query_209.verify|verify} messages.
     * @param message query_209 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_209, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_209 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_209
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_209;

    /**
     * Decodes a query_209 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_209
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_209;

    /**
     * Verifies a query_209 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_209 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_209
     */
    public static fromObject(object: { [k: string]: any }): query_209;

    /**
     * Creates a plain object from a query_209 message. Also converts values to other types if specified.
     * @param message query_209
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_209, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_209 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_209
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_209. */
export class reply_209 implements Ireply_209 {

    /**
     * Constructs a new reply_209.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_209);

    /** reply_209 config_info. */
    public config_info?: (Iplayer_config|null);

    /**
     * Creates a new reply_209 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_209 instance
     */
    public static create(properties?: Ireply_209): reply_209;

    /**
     * Encodes the specified reply_209 message. Does not implicitly {@link reply_209.verify|verify} messages.
     * @param message reply_209 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_209, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_209 message, length delimited. Does not implicitly {@link reply_209.verify|verify} messages.
     * @param message reply_209 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_209, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_209 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_209
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_209;

    /**
     * Decodes a reply_209 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_209
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_209;

    /**
     * Verifies a reply_209 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_209 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_209
     */
    public static fromObject(object: { [k: string]: any }): reply_209;

    /**
     * Creates a plain object from a reply_209 message. Also converts values to other types if specified.
     * @param message reply_209
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_209, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_209 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_209
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_210. */
export class query_210 implements Iquery_210 {

    /**
     * Constructs a new query_210.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_210);

    /**
     * Creates a new query_210 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_210 instance
     */
    public static create(properties?: Iquery_210): query_210;

    /**
     * Encodes the specified query_210 message. Does not implicitly {@link query_210.verify|verify} messages.
     * @param message query_210 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_210, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_210 message, length delimited. Does not implicitly {@link query_210.verify|verify} messages.
     * @param message query_210 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_210, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_210 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_210
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_210;

    /**
     * Decodes a query_210 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_210
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_210;

    /**
     * Verifies a query_210 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_210 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_210
     */
    public static fromObject(object: { [k: string]: any }): query_210;

    /**
     * Creates a plain object from a query_210 message. Also converts values to other types if specified.
     * @param message query_210
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_210, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_210 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_210
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_210. */
export class reply_210 implements Ireply_210 {

    /**
     * Constructs a new reply_210.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_210);

    /** reply_210 status. */
    public status: number;

    /** reply_210 message. */
    public message: string;

    /**
     * Creates a new reply_210 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_210 instance
     */
    public static create(properties?: Ireply_210): reply_210;

    /**
     * Encodes the specified reply_210 message. Does not implicitly {@link reply_210.verify|verify} messages.
     * @param message reply_210 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_210, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_210 message, length delimited. Does not implicitly {@link reply_210.verify|verify} messages.
     * @param message reply_210 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_210, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_210 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_210
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_210;

    /**
     * Decodes a reply_210 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_210
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_210;

    /**
     * Verifies a reply_210 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_210 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_210
     */
    public static fromObject(object: { [k: string]: any }): reply_210;

    /**
     * Creates a plain object from a reply_210 message. Also converts values to other types if specified.
     * @param message reply_210
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_210, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_210 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_210
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_211. */
export class query_211 implements Iquery_211 {

    /**
     * Constructs a new query_211.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_211);

    /** query_211 guide_id. */
    public guide_id: number;

    /**
     * Creates a new query_211 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_211 instance
     */
    public static create(properties?: Iquery_211): query_211;

    /**
     * Encodes the specified query_211 message. Does not implicitly {@link query_211.verify|verify} messages.
     * @param message query_211 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_211, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_211 message, length delimited. Does not implicitly {@link query_211.verify|verify} messages.
     * @param message query_211 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_211, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_211 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_211
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_211;

    /**
     * Decodes a query_211 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_211
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_211;

    /**
     * Verifies a query_211 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_211 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_211
     */
    public static fromObject(object: { [k: string]: any }): query_211;

    /**
     * Creates a plain object from a query_211 message. Also converts values to other types if specified.
     * @param message query_211
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_211, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_211 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_211
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_211. */
export class reply_211 implements Ireply_211 {

    /**
     * Constructs a new reply_211.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_211);

    /** reply_211 status. */
    public status: number;

    /** reply_211 message. */
    public message: string;

    /** reply_211 guide_id. */
    public guide_id: number;

    /**
     * Creates a new reply_211 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_211 instance
     */
    public static create(properties?: Ireply_211): reply_211;

    /**
     * Encodes the specified reply_211 message. Does not implicitly {@link reply_211.verify|verify} messages.
     * @param message reply_211 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_211, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_211 message, length delimited. Does not implicitly {@link reply_211.verify|verify} messages.
     * @param message reply_211 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_211, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_211 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_211
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_211;

    /**
     * Decodes a reply_211 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_211
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_211;

    /**
     * Verifies a reply_211 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_211 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_211
     */
    public static fromObject(object: { [k: string]: any }): reply_211;

    /**
     * Creates a plain object from a reply_211 message. Also converts values to other types if specified.
     * @param message reply_211
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_211, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_211 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_211
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_212. */
export class query_212 implements Iquery_212 {

    /**
     * Constructs a new query_212.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_212);

    /** query_212 guide_id. */
    public guide_id: number;

    /** query_212 step_id. */
    public step_id: number;

    /**
     * Creates a new query_212 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_212 instance
     */
    public static create(properties?: Iquery_212): query_212;

    /**
     * Encodes the specified query_212 message. Does not implicitly {@link query_212.verify|verify} messages.
     * @param message query_212 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_212, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_212 message, length delimited. Does not implicitly {@link query_212.verify|verify} messages.
     * @param message query_212 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_212, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_212 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_212
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_212;

    /**
     * Decodes a query_212 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_212
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_212;

    /**
     * Verifies a query_212 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_212 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_212
     */
    public static fromObject(object: { [k: string]: any }): query_212;

    /**
     * Creates a plain object from a query_212 message. Also converts values to other types if specified.
     * @param message query_212
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_212, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_212 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_212
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_212. */
export class reply_212 implements Ireply_212 {

    /**
     * Constructs a new reply_212.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_212);

    /** reply_212 status. */
    public status: number;

    /** reply_212 message. */
    public message: string;

    /**
     * Creates a new reply_212 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_212 instance
     */
    public static create(properties?: Ireply_212): reply_212;

    /**
     * Encodes the specified reply_212 message. Does not implicitly {@link reply_212.verify|verify} messages.
     * @param message reply_212 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_212, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_212 message, length delimited. Does not implicitly {@link reply_212.verify|verify} messages.
     * @param message reply_212 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_212, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_212 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_212
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_212;

    /**
     * Decodes a reply_212 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_212
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_212;

    /**
     * Verifies a reply_212 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_212 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_212
     */
    public static fromObject(object: { [k: string]: any }): reply_212;

    /**
     * Creates a plain object from a reply_212 message. Also converts values to other types if specified.
     * @param message reply_212
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_212, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_212 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_212
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_213. */
export class query_213 implements Iquery_213 {

    /**
     * Constructs a new query_213.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_213);

    /** query_213 quest_id. */
    public quest_id: number;

    /** query_213 answer_id. */
    public answer_id: number;

    /**
     * Creates a new query_213 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_213 instance
     */
    public static create(properties?: Iquery_213): query_213;

    /**
     * Encodes the specified query_213 message. Does not implicitly {@link query_213.verify|verify} messages.
     * @param message query_213 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_213, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_213 message, length delimited. Does not implicitly {@link query_213.verify|verify} messages.
     * @param message query_213 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_213, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_213 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_213
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_213;

    /**
     * Decodes a query_213 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_213
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_213;

    /**
     * Verifies a query_213 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_213 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_213
     */
    public static fromObject(object: { [k: string]: any }): query_213;

    /**
     * Creates a plain object from a query_213 message. Also converts values to other types if specified.
     * @param message query_213
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_213, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_213 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_213
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_213. */
export class reply_213 implements Ireply_213 {

    /**
     * Constructs a new reply_213.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_213);

    /** reply_213 status. */
    public status: number;

    /** reply_213 message. */
    public message: string;

    /** reply_213 answer_id_list. */
    public answer_id_list: number[];

    /**
     * Creates a new reply_213 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_213 instance
     */
    public static create(properties?: Ireply_213): reply_213;

    /**
     * Encodes the specified reply_213 message. Does not implicitly {@link reply_213.verify|verify} messages.
     * @param message reply_213 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_213, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_213 message, length delimited. Does not implicitly {@link reply_213.verify|verify} messages.
     * @param message reply_213 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_213, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_213 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_213
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_213;

    /**
     * Decodes a reply_213 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_213
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_213;

    /**
     * Verifies a reply_213 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_213 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_213
     */
    public static fromObject(object: { [k: string]: any }): reply_213;

    /**
     * Creates a plain object from a reply_213 message. Also converts values to other types if specified.
     * @param message reply_213
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_213, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_213 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_213
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_214. */
export class query_214 implements Iquery_214 {

    /**
     * Constructs a new query_214.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_214);

    /** query_214 sex. */
    public sex: number;

    /** query_214 figure. */
    public figure: number;

    /** query_214 color. */
    public color: number;

    /** query_214 nickname. */
    public nickname: string;

    /**
     * Creates a new query_214 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_214 instance
     */
    public static create(properties?: Iquery_214): query_214;

    /**
     * Encodes the specified query_214 message. Does not implicitly {@link query_214.verify|verify} messages.
     * @param message query_214 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_214, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_214 message, length delimited. Does not implicitly {@link query_214.verify|verify} messages.
     * @param message query_214 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_214, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_214 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_214
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_214;

    /**
     * Decodes a query_214 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_214
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_214;

    /**
     * Verifies a query_214 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_214 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_214
     */
    public static fromObject(object: { [k: string]: any }): query_214;

    /**
     * Creates a plain object from a query_214 message. Also converts values to other types if specified.
     * @param message query_214
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_214, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_214 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_214
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_214. */
export class reply_214 implements Ireply_214 {

    /**
     * Constructs a new reply_214.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_214);

    /** reply_214 status. */
    public status: number;

    /** reply_214 message. */
    public message: string;

    /** reply_214 sex. */
    public sex: number;

    /** reply_214 figure. */
    public figure: number;

    /** reply_214 color. */
    public color: number;

    /** reply_214 nickname. */
    public nickname: string;

    /**
     * Creates a new reply_214 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_214 instance
     */
    public static create(properties?: Ireply_214): reply_214;

    /**
     * Encodes the specified reply_214 message. Does not implicitly {@link reply_214.verify|verify} messages.
     * @param message reply_214 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_214, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_214 message, length delimited. Does not implicitly {@link reply_214.verify|verify} messages.
     * @param message reply_214 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_214, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_214 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_214
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_214;

    /**
     * Decodes a reply_214 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_214
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_214;

    /**
     * Verifies a reply_214 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_214 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_214
     */
    public static fromObject(object: { [k: string]: any }): reply_214;

    /**
     * Creates a plain object from a reply_214 message. Also converts values to other types if specified.
     * @param message reply_214
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_214, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_214 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_214
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_220. */
export class query_220 implements Iquery_220 {

    /**
     * Constructs a new query_220.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_220);

    /** query_220 head_id. */
    public head_id: number;

    /**
     * Creates a new query_220 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_220 instance
     */
    public static create(properties?: Iquery_220): query_220;

    /**
     * Encodes the specified query_220 message. Does not implicitly {@link query_220.verify|verify} messages.
     * @param message query_220 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_220, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_220 message, length delimited. Does not implicitly {@link query_220.verify|verify} messages.
     * @param message query_220 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_220, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_220 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_220
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_220;

    /**
     * Decodes a query_220 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_220
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_220;

    /**
     * Verifies a query_220 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_220 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_220
     */
    public static fromObject(object: { [k: string]: any }): query_220;

    /**
     * Creates a plain object from a query_220 message. Also converts values to other types if specified.
     * @param message query_220
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_220, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_220 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_220
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_220. */
export class reply_220 implements Ireply_220 {

    /**
     * Constructs a new reply_220.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_220);

    /** reply_220 status. */
    public status: number;

    /** reply_220 message. */
    public message: string;

    /** reply_220 head_id. */
    public head_id: number;

    /**
     * Creates a new reply_220 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_220 instance
     */
    public static create(properties?: Ireply_220): reply_220;

    /**
     * Encodes the specified reply_220 message. Does not implicitly {@link reply_220.verify|verify} messages.
     * @param message reply_220 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_220, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_220 message, length delimited. Does not implicitly {@link reply_220.verify|verify} messages.
     * @param message reply_220 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_220, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_220 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_220
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_220;

    /**
     * Decodes a reply_220 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_220
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_220;

    /**
     * Verifies a reply_220 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_220 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_220
     */
    public static fromObject(object: { [k: string]: any }): reply_220;

    /**
     * Creates a plain object from a reply_220 message. Also converts values to other types if specified.
     * @param message reply_220
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_220, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_220 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_220
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_221. */
export class query_221 implements Iquery_221 {

    /**
     * Constructs a new query_221.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_221);

    /** query_221 head_border. */
    public head_border: number;

    /**
     * Creates a new query_221 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_221 instance
     */
    public static create(properties?: Iquery_221): query_221;

    /**
     * Encodes the specified query_221 message. Does not implicitly {@link query_221.verify|verify} messages.
     * @param message query_221 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_221, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_221 message, length delimited. Does not implicitly {@link query_221.verify|verify} messages.
     * @param message query_221 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_221, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_221 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_221
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_221;

    /**
     * Decodes a query_221 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_221
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_221;

    /**
     * Verifies a query_221 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_221 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_221
     */
    public static fromObject(object: { [k: string]: any }): query_221;

    /**
     * Creates a plain object from a query_221 message. Also converts values to other types if specified.
     * @param message query_221
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_221, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_221 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_221
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_221. */
export class reply_221 implements Ireply_221 {

    /**
     * Constructs a new reply_221.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_221);

    /** reply_221 status. */
    public status: number;

    /** reply_221 message. */
    public message: string;

    /** reply_221 head_border. */
    public head_border: number;

    /**
     * Creates a new reply_221 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_221 instance
     */
    public static create(properties?: Ireply_221): reply_221;

    /**
     * Encodes the specified reply_221 message. Does not implicitly {@link reply_221.verify|verify} messages.
     * @param message reply_221 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_221, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_221 message, length delimited. Does not implicitly {@link reply_221.verify|verify} messages.
     * @param message reply_221 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_221, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_221 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_221
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_221;

    /**
     * Decodes a reply_221 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_221
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_221;

    /**
     * Verifies a reply_221 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_221 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_221
     */
    public static fromObject(object: { [k: string]: any }): reply_221;

    /**
     * Creates a plain object from a reply_221 message. Also converts values to other types if specified.
     * @param message reply_221
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_221, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_221 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_221
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_222. */
export class query_222 implements Iquery_222 {

    /**
     * Constructs a new query_222.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_222);

    /** query_222 speed. */
    public speed: number;

    /**
     * Creates a new query_222 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_222 instance
     */
    public static create(properties?: Iquery_222): query_222;

    /**
     * Encodes the specified query_222 message. Does not implicitly {@link query_222.verify|verify} messages.
     * @param message query_222 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_222, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_222 message, length delimited. Does not implicitly {@link query_222.verify|verify} messages.
     * @param message query_222 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_222, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_222 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_222
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_222;

    /**
     * Decodes a query_222 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_222
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_222;

    /**
     * Verifies a query_222 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_222 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_222
     */
    public static fromObject(object: { [k: string]: any }): query_222;

    /**
     * Creates a plain object from a query_222 message. Also converts values to other types if specified.
     * @param message query_222
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_222, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_222 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_222
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_222. */
export class reply_222 implements Ireply_222 {

    /**
     * Constructs a new reply_222.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_222);

    /** reply_222 status. */
    public status: number;

    /** reply_222 message. */
    public message: string;

    /** reply_222 speed. */
    public speed: number;

    /**
     * Creates a new reply_222 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_222 instance
     */
    public static create(properties?: Ireply_222): reply_222;

    /**
     * Encodes the specified reply_222 message. Does not implicitly {@link reply_222.verify|verify} messages.
     * @param message reply_222 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_222, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_222 message, length delimited. Does not implicitly {@link reply_222.verify|verify} messages.
     * @param message reply_222 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_222, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_222 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_222
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_222;

    /**
     * Decodes a reply_222 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_222
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_222;

    /**
     * Verifies a reply_222 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_222 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_222
     */
    public static fromObject(object: { [k: string]: any }): reply_222;

    /**
     * Creates a plain object from a reply_222 message. Also converts values to other types if specified.
     * @param message reply_222
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_222, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_222 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_222
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_223. */
export class query_223 implements Iquery_223 {

    /**
     * Constructs a new query_223.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_223);

    /** query_223 id. */
    public id: number;

    /** query_223 flag. */
    public flag: number;

    /**
     * Creates a new query_223 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_223 instance
     */
    public static create(properties?: Iquery_223): query_223;

    /**
     * Encodes the specified query_223 message. Does not implicitly {@link query_223.verify|verify} messages.
     * @param message query_223 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_223, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_223 message, length delimited. Does not implicitly {@link query_223.verify|verify} messages.
     * @param message query_223 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_223, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_223 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_223
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_223;

    /**
     * Decodes a query_223 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_223
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_223;

    /**
     * Verifies a query_223 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_223 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_223
     */
    public static fromObject(object: { [k: string]: any }): query_223;

    /**
     * Creates a plain object from a query_223 message. Also converts values to other types if specified.
     * @param message query_223
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_223, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_223 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_223
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_223. */
export class reply_223 implements Ireply_223 {

    /**
     * Constructs a new reply_223.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_223);

    /** reply_223 status. */
    public status: number;

    /** reply_223 message. */
    public message: string;

    /**
     * Creates a new reply_223 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_223 instance
     */
    public static create(properties?: Ireply_223): reply_223;

    /**
     * Encodes the specified reply_223 message. Does not implicitly {@link reply_223.verify|verify} messages.
     * @param message reply_223 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_223, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_223 message, length delimited. Does not implicitly {@link reply_223.verify|verify} messages.
     * @param message reply_223 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_223, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_223 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_223
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_223;

    /**
     * Decodes a reply_223 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_223
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_223;

    /**
     * Verifies a reply_223 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_223 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_223
     */
    public static fromObject(object: { [k: string]: any }): reply_223;

    /**
     * Creates a plain object from a reply_223 message. Also converts values to other types if specified.
     * @param message reply_223
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_223, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_223 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_223
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_224. */
export class query_224 implements Iquery_224 {

    /**
     * Constructs a new query_224.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_224);

    /** query_224 city_skin_id. */
    public city_skin_id: number;

    /**
     * Creates a new query_224 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_224 instance
     */
    public static create(properties?: Iquery_224): query_224;

    /**
     * Encodes the specified query_224 message. Does not implicitly {@link query_224.verify|verify} messages.
     * @param message query_224 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_224, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_224 message, length delimited. Does not implicitly {@link query_224.verify|verify} messages.
     * @param message query_224 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_224, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_224 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_224
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_224;

    /**
     * Decodes a query_224 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_224
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_224;

    /**
     * Verifies a query_224 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_224 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_224
     */
    public static fromObject(object: { [k: string]: any }): query_224;

    /**
     * Creates a plain object from a query_224 message. Also converts values to other types if specified.
     * @param message query_224
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_224, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_224 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_224
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_224. */
export class reply_224 implements Ireply_224 {

    /**
     * Constructs a new reply_224.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_224);

    /** reply_224 status. */
    public status: number;

    /** reply_224 message. */
    public message: string;

    /** reply_224 city_skin_id. */
    public city_skin_id: number;

    /**
     * Creates a new reply_224 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_224 instance
     */
    public static create(properties?: Ireply_224): reply_224;

    /**
     * Encodes the specified reply_224 message. Does not implicitly {@link reply_224.verify|verify} messages.
     * @param message reply_224 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_224, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_224 message, length delimited. Does not implicitly {@link reply_224.verify|verify} messages.
     * @param message reply_224 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_224, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_224 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_224
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_224;

    /**
     * Decodes a reply_224 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_224
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_224;

    /**
     * Verifies a reply_224 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_224 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_224
     */
    public static fromObject(object: { [k: string]: any }): reply_224;

    /**
     * Creates a plain object from a reply_224 message. Also converts values to other types if specified.
     * @param message reply_224
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_224, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_224 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_224
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_225. */
export class query_225 implements Iquery_225 {

    /**
     * Constructs a new query_225.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_225);

    /** query_225 designation. */
    public designation: number;

    /**
     * Creates a new query_225 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_225 instance
     */
    public static create(properties?: Iquery_225): query_225;

    /**
     * Encodes the specified query_225 message. Does not implicitly {@link query_225.verify|verify} messages.
     * @param message query_225 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_225, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_225 message, length delimited. Does not implicitly {@link query_225.verify|verify} messages.
     * @param message query_225 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_225, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_225 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_225
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_225;

    /**
     * Decodes a query_225 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_225
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_225;

    /**
     * Verifies a query_225 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_225 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_225
     */
    public static fromObject(object: { [k: string]: any }): query_225;

    /**
     * Creates a plain object from a query_225 message. Also converts values to other types if specified.
     * @param message query_225
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_225, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_225 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_225
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_225. */
export class reply_225 implements Ireply_225 {

    /**
     * Constructs a new reply_225.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_225);

    /** reply_225 status. */
    public status: number;

    /** reply_225 message. */
    public message: string;

    /** reply_225 designation. */
    public designation: number;

    /**
     * Creates a new reply_225 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_225 instance
     */
    public static create(properties?: Ireply_225): reply_225;

    /**
     * Encodes the specified reply_225 message. Does not implicitly {@link reply_225.verify|verify} messages.
     * @param message reply_225 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_225, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_225 message, length delimited. Does not implicitly {@link reply_225.verify|verify} messages.
     * @param message reply_225 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_225, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_225 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_225
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_225;

    /**
     * Decodes a reply_225 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_225
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_225;

    /**
     * Verifies a reply_225 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_225 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_225
     */
    public static fromObject(object: { [k: string]: any }): reply_225;

    /**
     * Creates a plain object from a reply_225 message. Also converts values to other types if specified.
     * @param message reply_225
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_225, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_225 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_225
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_226. */
export class query_226 implements Iquery_226 {

    /**
     * Constructs a new query_226.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_226);

    /** query_226 figure. */
    public figure: number;

    /**
     * Creates a new query_226 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_226 instance
     */
    public static create(properties?: Iquery_226): query_226;

    /**
     * Encodes the specified query_226 message. Does not implicitly {@link query_226.verify|verify} messages.
     * @param message query_226 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_226, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_226 message, length delimited. Does not implicitly {@link query_226.verify|verify} messages.
     * @param message query_226 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_226, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_226 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_226
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_226;

    /**
     * Decodes a query_226 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_226
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_226;

    /**
     * Verifies a query_226 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_226 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_226
     */
    public static fromObject(object: { [k: string]: any }): query_226;

    /**
     * Creates a plain object from a query_226 message. Also converts values to other types if specified.
     * @param message query_226
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_226, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_226 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_226
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_226. */
export class reply_226 implements Ireply_226 {

    /**
     * Constructs a new reply_226.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_226);

    /** reply_226 status. */
    public status: number;

    /** reply_226 message. */
    public message: string;

    /** reply_226 figure. */
    public figure: number;

    /**
     * Creates a new reply_226 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_226 instance
     */
    public static create(properties?: Ireply_226): reply_226;

    /**
     * Encodes the specified reply_226 message. Does not implicitly {@link reply_226.verify|verify} messages.
     * @param message reply_226 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_226, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_226 message, length delimited. Does not implicitly {@link reply_226.verify|verify} messages.
     * @param message reply_226 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_226, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_226 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_226
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_226;

    /**
     * Decodes a reply_226 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_226
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_226;

    /**
     * Verifies a reply_226 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_226 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_226
     */
    public static fromObject(object: { [k: string]: any }): reply_226;

    /**
     * Creates a plain object from a reply_226 message. Also converts values to other types if specified.
     * @param message reply_226
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_226, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_226 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_226
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_227. */
export class query_227 implements Iquery_227 {

    /**
     * Constructs a new query_227.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_227);

    /**
     * Creates a new query_227 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_227 instance
     */
    public static create(properties?: Iquery_227): query_227;

    /**
     * Encodes the specified query_227 message. Does not implicitly {@link query_227.verify|verify} messages.
     * @param message query_227 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_227, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_227 message, length delimited. Does not implicitly {@link query_227.verify|verify} messages.
     * @param message query_227 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_227, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_227 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_227
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_227;

    /**
     * Decodes a query_227 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_227
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_227;

    /**
     * Verifies a query_227 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_227 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_227
     */
    public static fromObject(object: { [k: string]: any }): query_227;

    /**
     * Creates a plain object from a query_227 message. Also converts values to other types if specified.
     * @param message query_227
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_227, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_227 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_227
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_227. */
export class reply_227 implements Ireply_227 {

    /**
     * Constructs a new reply_227.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_227);

    /** reply_227 status. */
    public status: number;

    /** reply_227 message. */
    public message: string;

    /**
     * Creates a new reply_227 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_227 instance
     */
    public static create(properties?: Ireply_227): reply_227;

    /**
     * Encodes the specified reply_227 message. Does not implicitly {@link reply_227.verify|verify} messages.
     * @param message reply_227 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_227, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_227 message, length delimited. Does not implicitly {@link reply_227.verify|verify} messages.
     * @param message reply_227 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_227, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_227 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_227
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_227;

    /**
     * Decodes a reply_227 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_227
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_227;

    /**
     * Verifies a reply_227 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_227 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_227
     */
    public static fromObject(object: { [k: string]: any }): reply_227;

    /**
     * Creates a plain object from a reply_227 message. Also converts values to other types if specified.
     * @param message reply_227
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_227, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_227 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_227
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_228. */
export class query_228 implements Iquery_228 {

    /**
     * Constructs a new query_228.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_228);

    /** query_228 fame_lock_status. */
    public fame_lock_status: number;

    /**
     * Creates a new query_228 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_228 instance
     */
    public static create(properties?: Iquery_228): query_228;

    /**
     * Encodes the specified query_228 message. Does not implicitly {@link query_228.verify|verify} messages.
     * @param message query_228 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_228, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_228 message, length delimited. Does not implicitly {@link query_228.verify|verify} messages.
     * @param message query_228 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_228, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_228 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_228
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_228;

    /**
     * Decodes a query_228 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_228
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_228;

    /**
     * Verifies a query_228 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_228 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_228
     */
    public static fromObject(object: { [k: string]: any }): query_228;

    /**
     * Creates a plain object from a query_228 message. Also converts values to other types if specified.
     * @param message query_228
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_228, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_228 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_228
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_228. */
export class reply_228 implements Ireply_228 {

    /**
     * Constructs a new reply_228.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_228);

    /** reply_228 status. */
    public status: number;

    /** reply_228 message. */
    public message: string;

    /**
     * Creates a new reply_228 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_228 instance
     */
    public static create(properties?: Ireply_228): reply_228;

    /**
     * Encodes the specified reply_228 message. Does not implicitly {@link reply_228.verify|verify} messages.
     * @param message reply_228 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_228, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_228 message, length delimited. Does not implicitly {@link reply_228.verify|verify} messages.
     * @param message reply_228 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_228, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_228 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_228
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_228;

    /**
     * Decodes a reply_228 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_228
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_228;

    /**
     * Verifies a reply_228 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_228 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_228
     */
    public static fromObject(object: { [k: string]: any }): reply_228;

    /**
     * Creates a plain object from a reply_228 message. Also converts values to other types if specified.
     * @param message reply_228
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_228, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_228 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_228
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_230. */
export class query_230 implements Iquery_230 {

    /**
     * Constructs a new query_230.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_230);

    /** query_230 player_full_id. */
    public player_full_id?: (Iplayer_full_id|null);

    /** query_230 formation_id. */
    public formation_id: number;

    /**
     * Creates a new query_230 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_230 instance
     */
    public static create(properties?: Iquery_230): query_230;

    /**
     * Encodes the specified query_230 message. Does not implicitly {@link query_230.verify|verify} messages.
     * @param message query_230 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_230, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_230 message, length delimited. Does not implicitly {@link query_230.verify|verify} messages.
     * @param message query_230 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_230, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_230 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_230
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_230;

    /**
     * Decodes a query_230 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_230
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_230;

    /**
     * Verifies a query_230 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_230 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_230
     */
    public static fromObject(object: { [k: string]: any }): query_230;

    /**
     * Creates a plain object from a query_230 message. Also converts values to other types if specified.
     * @param message query_230
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_230, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_230 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_230
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_230. */
export class reply_230 implements Ireply_230 {

    /**
     * Constructs a new reply_230.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_230);

    /** reply_230 status. */
    public status: number;

    /** reply_230 message. */
    public message: string;

    /** reply_230 other_player. */
    public other_player?: (Iother_player|null);

    /**
     * Creates a new reply_230 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_230 instance
     */
    public static create(properties?: Ireply_230): reply_230;

    /**
     * Encodes the specified reply_230 message. Does not implicitly {@link reply_230.verify|verify} messages.
     * @param message reply_230 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_230, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_230 message, length delimited. Does not implicitly {@link reply_230.verify|verify} messages.
     * @param message reply_230 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_230, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_230 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_230
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_230;

    /**
     * Decodes a reply_230 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_230
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_230;

    /**
     * Verifies a reply_230 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_230 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_230
     */
    public static fromObject(object: { [k: string]: any }): reply_230;

    /**
     * Creates a plain object from a reply_230 message. Also converts values to other types if specified.
     * @param message reply_230
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_230, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_230 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_230
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an achievements. */
export class achievements implements Iachievements {

    /**
     * Constructs a new achievements.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iachievements);

    /** achievements version. */
    public version: number;

    /** achievements journey. */
    public journey?: (Ijourney|null);

    /** achievements medal_type_info_list. */
    public medal_type_info_list: Imedal_type_info[];

    /** achievements card_slot_info_list. */
    public card_slot_info_list: Icard_slot_info[];

    /** achievements share_times. */
    public share_times: number;

    /**
     * Creates a new achievements instance using the specified properties.
     * @param [properties] Properties to set
     * @returns achievements instance
     */
    public static create(properties?: Iachievements): achievements;

    /**
     * Encodes the specified achievements message. Does not implicitly {@link achievements.verify|verify} messages.
     * @param message achievements message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iachievements, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified achievements message, length delimited. Does not implicitly {@link achievements.verify|verify} messages.
     * @param message achievements message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iachievements, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an achievements message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns achievements
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): achievements;

    /**
     * Decodes an achievements message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns achievements
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): achievements;

    /**
     * Verifies an achievements message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an achievements message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns achievements
     */
    public static fromObject(object: { [k: string]: any }): achievements;

    /**
     * Creates a plain object from an achievements message. Also converts values to other types if specified.
     * @param message achievements
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: achievements, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this achievements to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for achievements
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a journey. */
export class journey implements Ijourney {

    /**
     * Constructs a new journey.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ijourney);

    /** journey current_grade. */
    public current_grade: number;

    /** journey current_score. */
    public current_score: number;

    /** journey current_medal_num. */
    public current_medal_num: number;

    /**
     * Creates a new journey instance using the specified properties.
     * @param [properties] Properties to set
     * @returns journey instance
     */
    public static create(properties?: Ijourney): journey;

    /**
     * Encodes the specified journey message. Does not implicitly {@link journey.verify|verify} messages.
     * @param message journey message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ijourney, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified journey message, length delimited. Does not implicitly {@link journey.verify|verify} messages.
     * @param message journey message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ijourney, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a journey message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns journey
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): journey;

    /**
     * Decodes a journey message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns journey
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): journey;

    /**
     * Verifies a journey message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a journey message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns journey
     */
    public static fromObject(object: { [k: string]: any }): journey;

    /**
     * Creates a plain object from a journey message. Also converts values to other types if specified.
     * @param message journey
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: journey, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this journey to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for journey
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a medal_type_info. */
export class medal_type_info implements Imedal_type_info {

    /**
     * Constructs a new medal_type_info.
     * @param [properties] Properties to set
     */
    constructor(properties?: Imedal_type_info);

    /** medal_type_info medal_type. */
    public medal_type: number;

    /** medal_type_info medal_group_info_list. */
    public medal_group_info_list: Imedal_group_info[];

    /**
     * Creates a new medal_type_info instance using the specified properties.
     * @param [properties] Properties to set
     * @returns medal_type_info instance
     */
    public static create(properties?: Imedal_type_info): medal_type_info;

    /**
     * Encodes the specified medal_type_info message. Does not implicitly {@link medal_type_info.verify|verify} messages.
     * @param message medal_type_info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Imedal_type_info, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified medal_type_info message, length delimited. Does not implicitly {@link medal_type_info.verify|verify} messages.
     * @param message medal_type_info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Imedal_type_info, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a medal_type_info message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns medal_type_info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): medal_type_info;

    /**
     * Decodes a medal_type_info message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns medal_type_info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): medal_type_info;

    /**
     * Verifies a medal_type_info message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a medal_type_info message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns medal_type_info
     */
    public static fromObject(object: { [k: string]: any }): medal_type_info;

    /**
     * Creates a plain object from a medal_type_info message. Also converts values to other types if specified.
     * @param message medal_type_info
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: medal_type_info, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this medal_type_info to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for medal_type_info
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a medal_group_info. */
export class medal_group_info implements Imedal_group_info {

    /**
     * Constructs a new medal_group_info.
     * @param [properties] Properties to set
     */
    constructor(properties?: Imedal_group_info);

    /** medal_group_info group_id. */
    public group_id: number;

    /** medal_group_info current_num. */
    public current_num: number;

    /** medal_group_info medal_single_info_list. */
    public medal_single_info_list: Imedal_single_info[];

    /**
     * Creates a new medal_group_info instance using the specified properties.
     * @param [properties] Properties to set
     * @returns medal_group_info instance
     */
    public static create(properties?: Imedal_group_info): medal_group_info;

    /**
     * Encodes the specified medal_group_info message. Does not implicitly {@link medal_group_info.verify|verify} messages.
     * @param message medal_group_info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Imedal_group_info, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified medal_group_info message, length delimited. Does not implicitly {@link medal_group_info.verify|verify} messages.
     * @param message medal_group_info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Imedal_group_info, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a medal_group_info message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns medal_group_info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): medal_group_info;

    /**
     * Decodes a medal_group_info message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns medal_group_info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): medal_group_info;

    /**
     * Verifies a medal_group_info message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a medal_group_info message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns medal_group_info
     */
    public static fromObject(object: { [k: string]: any }): medal_group_info;

    /**
     * Creates a plain object from a medal_group_info message. Also converts values to other types if specified.
     * @param message medal_group_info
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: medal_group_info, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this medal_group_info to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for medal_group_info
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a medal_single_info. */
export class medal_single_info implements Imedal_single_info {

    /**
     * Constructs a new medal_single_info.
     * @param [properties] Properties to set
     */
    constructor(properties?: Imedal_single_info);

    /** medal_single_info medal_id. */
    public medal_id: number;

    /** medal_single_info status. */
    public status: number;

    /** medal_single_info require_num. */
    public require_num: number;

    /** medal_single_info activate_time. */
    public activate_time: number;

    /**
     * Creates a new medal_single_info instance using the specified properties.
     * @param [properties] Properties to set
     * @returns medal_single_info instance
     */
    public static create(properties?: Imedal_single_info): medal_single_info;

    /**
     * Encodes the specified medal_single_info message. Does not implicitly {@link medal_single_info.verify|verify} messages.
     * @param message medal_single_info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Imedal_single_info, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified medal_single_info message, length delimited. Does not implicitly {@link medal_single_info.verify|verify} messages.
     * @param message medal_single_info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Imedal_single_info, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a medal_single_info message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns medal_single_info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): medal_single_info;

    /**
     * Decodes a medal_single_info message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns medal_single_info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): medal_single_info;

    /**
     * Verifies a medal_single_info message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a medal_single_info message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns medal_single_info
     */
    public static fromObject(object: { [k: string]: any }): medal_single_info;

    /**
     * Creates a plain object from a medal_single_info message. Also converts values to other types if specified.
     * @param message medal_single_info
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: medal_single_info, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this medal_single_info to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for medal_single_info
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a card_slot_info. */
export class card_slot_info implements Icard_slot_info {

    /**
     * Constructs a new card_slot_info.
     * @param [properties] Properties to set
     */
    constructor(properties?: Icard_slot_info);

    /** card_slot_info slot_id. */
    public slot_id: number;

    /** card_slot_info medal_id. */
    public medal_id: number;

    /**
     * Creates a new card_slot_info instance using the specified properties.
     * @param [properties] Properties to set
     * @returns card_slot_info instance
     */
    public static create(properties?: Icard_slot_info): card_slot_info;

    /**
     * Encodes the specified card_slot_info message. Does not implicitly {@link card_slot_info.verify|verify} messages.
     * @param message card_slot_info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Icard_slot_info, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified card_slot_info message, length delimited. Does not implicitly {@link card_slot_info.verify|verify} messages.
     * @param message card_slot_info message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Icard_slot_info, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a card_slot_info message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns card_slot_info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): card_slot_info;

    /**
     * Decodes a card_slot_info message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns card_slot_info
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): card_slot_info;

    /**
     * Verifies a card_slot_info message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a card_slot_info message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns card_slot_info
     */
    public static fromObject(object: { [k: string]: any }): card_slot_info;

    /**
     * Creates a plain object from a card_slot_info message. Also converts values to other types if specified.
     * @param message card_slot_info
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: card_slot_info, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this card_slot_info to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for card_slot_info
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_260. */
export class query_260 implements Iquery_260 {

    /**
     * Constructs a new query_260.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_260);

    /** query_260 medal_type. */
    public medal_type: number;

    /** query_260 medal_group. */
    public medal_group: number;

    /** query_260 medal_id. */
    public medal_id: number;

    /**
     * Creates a new query_260 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_260 instance
     */
    public static create(properties?: Iquery_260): query_260;

    /**
     * Encodes the specified query_260 message. Does not implicitly {@link query_260.verify|verify} messages.
     * @param message query_260 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_260, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_260 message, length delimited. Does not implicitly {@link query_260.verify|verify} messages.
     * @param message query_260 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_260, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_260 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_260
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_260;

    /**
     * Decodes a query_260 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_260
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_260;

    /**
     * Verifies a query_260 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_260 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_260
     */
    public static fromObject(object: { [k: string]: any }): query_260;

    /**
     * Creates a plain object from a query_260 message. Also converts values to other types if specified.
     * @param message query_260
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_260, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_260 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_260
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_260. */
export class reply_260 implements Ireply_260 {

    /**
     * Constructs a new reply_260.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_260);

    /** reply_260 status. */
    public status: number;

    /** reply_260 message. */
    public message: string;

    /** reply_260 medal_id. */
    public medal_id: number;

    /** reply_260 journey. */
    public journey?: (Ijourney|null);

    /**
     * Creates a new reply_260 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_260 instance
     */
    public static create(properties?: Ireply_260): reply_260;

    /**
     * Encodes the specified reply_260 message. Does not implicitly {@link reply_260.verify|verify} messages.
     * @param message reply_260 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_260, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_260 message, length delimited. Does not implicitly {@link reply_260.verify|verify} messages.
     * @param message reply_260 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_260, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_260 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_260
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_260;

    /**
     * Decodes a reply_260 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_260
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_260;

    /**
     * Verifies a reply_260 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_260 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_260
     */
    public static fromObject(object: { [k: string]: any }): reply_260;

    /**
     * Creates a plain object from a reply_260 message. Also converts values to other types if specified.
     * @param message reply_260
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_260, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_260 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_260
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_261. */
export class query_261 implements Iquery_261 {

    /**
     * Constructs a new query_261.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_261);

    /** query_261 medal_type. */
    public medal_type: number;

    /** query_261 medal_group. */
    public medal_group: number;

    /** query_261 medal_id. */
    public medal_id: number;

    /** query_261 slot_id. */
    public slot_id: number;

    /**
     * Creates a new query_261 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_261 instance
     */
    public static create(properties?: Iquery_261): query_261;

    /**
     * Encodes the specified query_261 message. Does not implicitly {@link query_261.verify|verify} messages.
     * @param message query_261 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_261, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_261 message, length delimited. Does not implicitly {@link query_261.verify|verify} messages.
     * @param message query_261 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_261, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_261 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_261
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_261;

    /**
     * Decodes a query_261 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_261
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_261;

    /**
     * Verifies a query_261 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_261 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_261
     */
    public static fromObject(object: { [k: string]: any }): query_261;

    /**
     * Creates a plain object from a query_261 message. Also converts values to other types if specified.
     * @param message query_261
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_261, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_261 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_261
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_261. */
export class reply_261 implements Ireply_261 {

    /**
     * Constructs a new reply_261.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_261);

    /** reply_261 status. */
    public status: number;

    /** reply_261 message. */
    public message: string;

    /** reply_261 card_slot_info_list. */
    public card_slot_info_list: Icard_slot_info[];

    /** reply_261 medal_id. */
    public medal_id: number;

    /** reply_261 slot_medal_id. */
    public slot_medal_id: number;

    /**
     * Creates a new reply_261 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_261 instance
     */
    public static create(properties?: Ireply_261): reply_261;

    /**
     * Encodes the specified reply_261 message. Does not implicitly {@link reply_261.verify|verify} messages.
     * @param message reply_261 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_261, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_261 message, length delimited. Does not implicitly {@link reply_261.verify|verify} messages.
     * @param message reply_261 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_261, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_261 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_261
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_261;

    /**
     * Decodes a reply_261 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_261
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_261;

    /**
     * Verifies a reply_261 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_261 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_261
     */
    public static fromObject(object: { [k: string]: any }): reply_261;

    /**
     * Creates a plain object from a reply_261 message. Also converts values to other types if specified.
     * @param message reply_261
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_261, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_261 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_261
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_262. */
export class query_262 implements Iquery_262 {

    /**
     * Constructs a new query_262.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_262);

    /**
     * Creates a new query_262 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_262 instance
     */
    public static create(properties?: Iquery_262): query_262;

    /**
     * Encodes the specified query_262 message. Does not implicitly {@link query_262.verify|verify} messages.
     * @param message query_262 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_262, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_262 message, length delimited. Does not implicitly {@link query_262.verify|verify} messages.
     * @param message query_262 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_262, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_262 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_262
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_262;

    /**
     * Decodes a query_262 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_262
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_262;

    /**
     * Verifies a query_262 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_262 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_262
     */
    public static fromObject(object: { [k: string]: any }): query_262;

    /**
     * Creates a plain object from a query_262 message. Also converts values to other types if specified.
     * @param message query_262
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_262, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_262 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_262
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_262. */
export class reply_262 implements Ireply_262 {

    /**
     * Constructs a new reply_262.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_262);

    /** reply_262 status. */
    public status: number;

    /** reply_262 message. */
    public message: string;

    /** reply_262 achievements. */
    public achievements?: (Iachievements|null);

    /**
     * Creates a new reply_262 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_262 instance
     */
    public static create(properties?: Ireply_262): reply_262;

    /**
     * Encodes the specified reply_262 message. Does not implicitly {@link reply_262.verify|verify} messages.
     * @param message reply_262 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_262, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_262 message, length delimited. Does not implicitly {@link reply_262.verify|verify} messages.
     * @param message reply_262 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_262, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_262 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_262
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_262;

    /**
     * Decodes a reply_262 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_262
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_262;

    /**
     * Verifies a reply_262 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_262 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_262
     */
    public static fromObject(object: { [k: string]: any }): reply_262;

    /**
     * Creates a plain object from a reply_262 message. Also converts values to other types if specified.
     * @param message reply_262
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_262, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_262 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_262
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_263. */
export class query_263 implements Iquery_263 {

    /**
     * Constructs a new query_263.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_263);

    /** query_263 channel_type. */
    public channel_type: number;

    /** query_263 medal_id. */
    public medal_id: number;

    /**
     * Creates a new query_263 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_263 instance
     */
    public static create(properties?: Iquery_263): query_263;

    /**
     * Encodes the specified query_263 message. Does not implicitly {@link query_263.verify|verify} messages.
     * @param message query_263 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_263, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_263 message, length delimited. Does not implicitly {@link query_263.verify|verify} messages.
     * @param message query_263 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_263, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_263 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_263
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_263;

    /**
     * Decodes a query_263 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_263
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_263;

    /**
     * Verifies a query_263 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_263 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_263
     */
    public static fromObject(object: { [k: string]: any }): query_263;

    /**
     * Creates a plain object from a query_263 message. Also converts values to other types if specified.
     * @param message query_263
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_263, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_263 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_263
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_263. */
export class reply_263 implements Ireply_263 {

    /**
     * Constructs a new reply_263.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_263);

    /** reply_263 status. */
    public status: number;

    /** reply_263 message. */
    public message: string;

    /**
     * Creates a new reply_263 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_263 instance
     */
    public static create(properties?: Ireply_263): reply_263;

    /**
     * Encodes the specified reply_263 message. Does not implicitly {@link reply_263.verify|verify} messages.
     * @param message reply_263 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_263, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_263 message, length delimited. Does not implicitly {@link reply_263.verify|verify} messages.
     * @param message reply_263 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_263, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_263 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_263
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_263;

    /**
     * Decodes a reply_263 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_263
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_263;

    /**
     * Verifies a reply_263 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_263 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_263
     */
    public static fromObject(object: { [k: string]: any }): reply_263;

    /**
     * Creates a plain object from a reply_263 message. Also converts values to other types if specified.
     * @param message reply_263
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_263, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_263 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_263
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_264. */
export class query_264 implements Iquery_264 {

    /**
     * Constructs a new query_264.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_264);

    /** query_264 full_id. */
    public full_id?: (Iplayer_full_id|null);

    /** query_264 medal_id. */
    public medal_id: number;

    /**
     * Creates a new query_264 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_264 instance
     */
    public static create(properties?: Iquery_264): query_264;

    /**
     * Encodes the specified query_264 message. Does not implicitly {@link query_264.verify|verify} messages.
     * @param message query_264 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_264, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_264 message, length delimited. Does not implicitly {@link query_264.verify|verify} messages.
     * @param message query_264 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_264, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_264 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_264
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_264;

    /**
     * Decodes a query_264 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_264
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_264;

    /**
     * Verifies a query_264 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_264 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_264
     */
    public static fromObject(object: { [k: string]: any }): query_264;

    /**
     * Creates a plain object from a query_264 message. Also converts values to other types if specified.
     * @param message query_264
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_264, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_264 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_264
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_264. */
export class reply_264 implements Ireply_264 {

    /**
     * Constructs a new reply_264.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_264);

    /** reply_264 status. */
    public status: number;

    /** reply_264 message. */
    public message: string;

    /** reply_264 current_num. */
    public current_num: number;

    /** reply_264 medal_single_info. */
    public medal_single_info?: (Imedal_single_info|null);

    /** reply_264 journey. */
    public journey?: (Ijourney|null);

    /** reply_264 player_name. */
    public player_name: string;

    /**
     * Creates a new reply_264 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_264 instance
     */
    public static create(properties?: Ireply_264): reply_264;

    /**
     * Encodes the specified reply_264 message. Does not implicitly {@link reply_264.verify|verify} messages.
     * @param message reply_264 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_264, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_264 message, length delimited. Does not implicitly {@link reply_264.verify|verify} messages.
     * @param message reply_264 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_264, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_264 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_264
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_264;

    /**
     * Decodes a reply_264 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_264
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_264;

    /**
     * Verifies a reply_264 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_264 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_264
     */
    public static fromObject(object: { [k: string]: any }): reply_264;

    /**
     * Creates a plain object from a reply_264 message. Also converts values to other types if specified.
     * @param message reply_264
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_264, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_264 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_264
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_265. */
export class query_265 implements Iquery_265 {

    /**
     * Constructs a new query_265.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_265);

    /**
     * Creates a new query_265 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_265 instance
     */
    public static create(properties?: Iquery_265): query_265;

    /**
     * Encodes the specified query_265 message. Does not implicitly {@link query_265.verify|verify} messages.
     * @param message query_265 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_265, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_265 message, length delimited. Does not implicitly {@link query_265.verify|verify} messages.
     * @param message query_265 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_265, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_265 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_265
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_265;

    /**
     * Decodes a query_265 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_265
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_265;

    /**
     * Verifies a query_265 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_265 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_265
     */
    public static fromObject(object: { [k: string]: any }): query_265;

    /**
     * Creates a plain object from a query_265 message. Also converts values to other types if specified.
     * @param message query_265
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_265, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_265 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_265
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_265. */
export class reply_265 implements Ireply_265 {

    /**
     * Constructs a new reply_265.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_265);

    /** reply_265 client_data. */
    public client_data?: (Iclient_data|null);

    /**
     * Creates a new reply_265 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_265 instance
     */
    public static create(properties?: Ireply_265): reply_265;

    /**
     * Encodes the specified reply_265 message. Does not implicitly {@link reply_265.verify|verify} messages.
     * @param message reply_265 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_265, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_265 message, length delimited. Does not implicitly {@link reply_265.verify|verify} messages.
     * @param message reply_265 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_265, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_265 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_265
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_265;

    /**
     * Decodes a reply_265 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_265
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_265;

    /**
     * Verifies a reply_265 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_265 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_265
     */
    public static fromObject(object: { [k: string]: any }): reply_265;

    /**
     * Creates a plain object from a reply_265 message. Also converts values to other types if specified.
     * @param message reply_265
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_265, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_265 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_265
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_266. */
export class query_266 implements Iquery_266 {

    /**
     * Constructs a new query_266.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_266);

    /** query_266 client_data. */
    public client_data?: (Iclient_data|null);

    /**
     * Creates a new query_266 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_266 instance
     */
    public static create(properties?: Iquery_266): query_266;

    /**
     * Encodes the specified query_266 message. Does not implicitly {@link query_266.verify|verify} messages.
     * @param message query_266 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_266, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_266 message, length delimited. Does not implicitly {@link query_266.verify|verify} messages.
     * @param message query_266 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_266, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_266 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_266
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_266;

    /**
     * Decodes a query_266 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_266
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_266;

    /**
     * Verifies a query_266 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_266 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_266
     */
    public static fromObject(object: { [k: string]: any }): query_266;

    /**
     * Creates a plain object from a query_266 message. Also converts values to other types if specified.
     * @param message query_266
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_266, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_266 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_266
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_266. */
export class reply_266 implements Ireply_266 {

    /**
     * Constructs a new reply_266.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_266);

    /** reply_266 status. */
    public status: number;

    /** reply_266 message. */
    public message: string;

    /**
     * Creates a new reply_266 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_266 instance
     */
    public static create(properties?: Ireply_266): reply_266;

    /**
     * Encodes the specified reply_266 message. Does not implicitly {@link reply_266.verify|verify} messages.
     * @param message reply_266 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_266, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_266 message, length delimited. Does not implicitly {@link reply_266.verify|verify} messages.
     * @param message reply_266 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_266, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_266 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_266
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_266;

    /**
     * Decodes a reply_266 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_266
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_266;

    /**
     * Verifies a reply_266 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_266 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_266
     */
    public static fromObject(object: { [k: string]: any }): reply_266;

    /**
     * Creates a plain object from a reply_266 message. Also converts values to other types if specified.
     * @param message reply_266
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_266, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_266 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_266
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an equip. */
export class equip implements Iequip {

    /**
     * Constructs a new equip.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iequip);

    /** equip equip_id. */
    public equip_id: number;

    /** equip effect_name. */
    public effect_name: string;

    /** equip effect_value. */
    public effect_value: number;

    /** equip equip_quality. */
    public equip_quality: number;

    /** equip equip_lv. */
    public equip_lv: number;

    /**
     * Creates a new equip instance using the specified properties.
     * @param [properties] Properties to set
     * @returns equip instance
     */
    public static create(properties?: Iequip): equip;

    /**
     * Encodes the specified equip message. Does not implicitly {@link equip.verify|verify} messages.
     * @param message equip message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iequip, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified equip message, length delimited. Does not implicitly {@link equip.verify|verify} messages.
     * @param message equip message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iequip, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an equip message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns equip
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): equip;

    /**
     * Decodes an equip message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns equip
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): equip;

    /**
     * Verifies an equip message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an equip message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns equip
     */
    public static fromObject(object: { [k: string]: any }): equip;

    /**
     * Creates a plain object from an equip message. Also converts values to other types if specified.
     * @param message equip
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: equip, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this equip to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for equip
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a client_data. */
export class client_data implements Iclient_data {

    /**
     * Constructs a new client_data.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iclient_data);

    /** client_data version. */
    public version: number;

    /** client_data is_new. */
    public is_new: number;

    /** client_data user_data. */
    public user_data?: (Iuser_data|null);

    /** client_data task_data. */
    public task_data?: (Itask_data|null);

    /** client_data battle_data. */
    public battle_data?: (Ibattle_data|null);

    /**
     * Creates a new client_data instance using the specified properties.
     * @param [properties] Properties to set
     * @returns client_data instance
     */
    public static create(properties?: Iclient_data): client_data;

    /**
     * Encodes the specified client_data message. Does not implicitly {@link client_data.verify|verify} messages.
     * @param message client_data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iclient_data, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified client_data message, length delimited. Does not implicitly {@link client_data.verify|verify} messages.
     * @param message client_data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iclient_data, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a client_data message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns client_data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): client_data;

    /**
     * Decodes a client_data message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns client_data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): client_data;

    /**
     * Verifies a client_data message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a client_data message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns client_data
     */
    public static fromObject(object: { [k: string]: any }): client_data;

    /**
     * Creates a plain object from a client_data message. Also converts values to other types if specified.
     * @param message client_data
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: client_data, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this client_data to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for client_data
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a user_data. */
export class user_data implements Iuser_data {

    /**
     * Constructs a new user_data.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iuser_data);

    /** user_data player_id. */
    public player_id: number;

    /** user_data srvno. */
    public srvno: string;

    /** user_data nickname. */
    public nickname: string;

    /** user_data head_id. */
    public head_id: number;

    /** user_data head_border. */
    public head_border: number;

    /** user_data figure. */
    public figure: number;

    /** user_data color. */
    public color: number;

    /** user_data designation. */
    public designation: number;

    /** user_data lv. */
    public lv: number;

    /** user_data power. */
    public power: number;

    /** user_data online_flag. */
    public online_flag: number;

    /** user_data last_logout_time. */
    public last_logout_time: number;

    /** user_data guild_guid. */
    public guild_guid: string;

    /** user_data guild_name. */
    public guild_name: string;

    /** user_data vip. */
    public vip: number;

    /** user_data cur_grade. */
    public cur_grade: number;

    /** user_data pvp_rank_id. */
    public pvp_rank_id: number;

    /** user_data history_max_grade. */
    public history_max_grade: number;

    /** user_data total_victory_num. */
    public total_victory_num: number;

    /** user_data total_defeated_num. */
    public total_defeated_num: number;

    /** user_data total_draw_num. */
    public total_draw_num: number;

    /** user_data adventure_level_progress. */
    public adventure_level_progress: number;

    /** user_data max_chapter. */
    public max_chapter: number;

    /** user_data career. */
    public career: number;

    /** user_data sdkname. */
    public sdkname: string;

    /** user_data age. */
    public age: number;

    /** user_data create_nickname. */
    public create_nickname: boolean;

    /** user_data play_comic. */
    public play_comic: boolean;

    /** user_data play_comic_num. */
    public play_comic_num: number;

    /** user_data resetTime. */
    public resetTime: number;

    /** user_data lose_chapter. */
    public lose_chapter: number;

    /** user_data inviteNum. */
    public inviteNum: number;

    /** user_data randomItemList. */
    public randomItemList: number;

    /** user_data inviteTodayAdNum. */
    public inviteTodayAdNum: number;

    /** user_data inviteTodayAdLastNum. */
    public inviteTodayAdLastNum: number;

    /** user_data inviteTodayAdNum1. */
    public inviteTodayAdNum1: number;

    /** user_data inviteTodayAdLastNum1. */
    public inviteTodayAdLastNum1: number;

    /** user_data inviteNumTotalOrange. */
    public inviteNumTotalOrange: number;

    /** user_data inviteNumTotalRed. */
    public inviteNumTotalRed: number;

    /** user_data inviteNumDefaultTotal. */
    public inviteNumDefaultTotal: number;

    /** user_data inviteLimiteDailyTotalNum. */
    public inviteLimiteDailyTotalNum: number;

    /** user_data inviteLimiteDailyNum. */
    public inviteLimiteDailyNum: number;

    /** user_data orangeStaff. */
    public orangeStaff: number;

    /** user_data guideSwitch. */
    public guideSwitch: boolean;

    /** user_data guideSuspend. */
    public guideSuspend: boolean;

    /** user_data guideId. */
    public guideId: number;

    /** user_data guideListId. */
    public guideListId: number;

    /** user_data guidanceId. */
    public guidanceId: number;

    /** user_data isBattleSuspend. */
    public isBattleSuspend: boolean;

    /** user_data isFirstStartBattle. */
    public isFirstStartBattle: boolean;

    /** user_data audioMusic. */
    public audioMusic: number;

    /** user_data audioSound. */
    public audioSound: number;

    /** user_data unlockNum. */
    public unlockNum: number;

    /** user_data isInitialCharge. */
    public isInitialCharge: boolean;

    /** user_data sevenSignIsOpen. */
    public sevenSignIsOpen: boolean;

    /** user_data sevenSignIsReceive. */
    public sevenSignIsReceive: boolean;

    /** user_data sevenSignDay. */
    public sevenSignDay: number;

    /** user_data sevenSignIsADReceive. */
    public sevenSignIsADReceive: boolean;

    /** user_data hangupStartTime. */
    public hangupStartTime: number;

    /** user_data hangupAlreadyTime. */
    public hangupAlreadyTime: number;

    /** user_data basicHangupTime. */
    public basicHangupTime: number;

    /** user_data addHangupTime. */
    public addHangupTime: number;

    /** user_data hangupPromotionId. */
    public hangupPromotionId: number;

    /** user_data dailyAccumulatedTime. */
    public dailyAccumulatedTime: number;

    /** user_data lastUpdateTime. */
    public lastUpdateTime: number;

    /** user_data updateTimes. */
    public updateTimes: number;

    /** user_data isFirstEnterReward. */
    public isFirstEnterReward: boolean;

    /** user_data batteryNumberLimit. */
    public batteryNumberLimit: number;

    /** user_data batteryBullionBuyLastNumber. */
    public batteryBullionBuyLastNumber: number;

    /** user_data batteryBullionBuyNumber. */
    public batteryBullionBuyNumber: number;

    /** user_data batteryBullionCost. */
    public batteryBullionCost: number;

    /** user_data isEndlessBattleScene. */
    public isEndlessBattleScene: boolean;

    /** user_data endlessChallengeMaxScore. */
    public endlessChallengeMaxScore: number;

    /** user_data endlessChallengeMaxSurvive. */
    public endlessChallengeMaxSurvive: number;

    /** user_data endlessLikeCount. */
    public endlessLikeCount: number;

    /** user_data endlessChapter. */
    public endlessChapter: number;

    /** user_data endlessChooseSurvive. */
    public endlessChooseSurvive: number;

    /** user_data endlessRewardStatus_list. */
    public endlessRewardStatus_list: IendlessRewardStatus[];

    /** user_data batteryStrengthenValue0. */
    public batteryStrengthenValue0: number;

    /** user_data batteryStrengthenValue1. */
    public batteryStrengthenValue1: number;

    /** user_data batteryStrengthenValue2. */
    public batteryStrengthenValue2: number;

    /** user_data batteryStrengthenValue3. */
    public batteryStrengthenValue3: number;

    /** user_data batteryStrengthenLv0. */
    public batteryStrengthenLv0: number;

    /** user_data batteryStrengthenLv1. */
    public batteryStrengthenLv1: number;

    /** user_data batteryStrengthenLv2. */
    public batteryStrengthenLv2: number;

    /** user_data batteryStrengthenLv3. */
    public batteryStrengthenLv3: number;

    /** user_data doll_machine_lv. */
    public doll_machine_lv: number;

    /** user_data cost_money_month. */
    public cost_money_month: number;

    /** user_data hasEquip_list. */
    public hasEquip_list: Iequip[];

    /** user_data temporaryEquipData_list. */
    public temporaryEquipData_list: Iequip[];

    /** user_data random_equip_type. */
    public random_equip_type: string;

    /** user_data random_equip_position. */
    public random_equip_position: number;

    /** user_data money_item_status_list. */
    public money_item_status_list: ImoneyItemStatus[];

    /** user_data daily_item_times_list. */
    public daily_item_times_list: IdailyItemTimes[];

    /** user_data weekly_item_times_list. */
    public weekly_item_times_list: IweeklyItemTimes[];

    /** user_data monthly_item_times_list. */
    public monthly_item_times_list: ImonthlyItemTimes[];

    /** user_data hasGoods_list. */
    public hasGoods_list: IgoodsItem[];

    /** user_data furniture_add_list. */
    public furniture_add_list: IfurnitureAdd[];

    /** user_data builds_list. */
    public builds_list: IunlockBuild[];

    /** user_data towerDebris_list. */
    public towerDebris_list: IdebrisItem[];

    /** user_data towerLv_list. */
    public towerLv_list: ItowerLvItem[];

    /** user_data tower_list. */
    public tower_list: Iemployee[];

    /** user_data build_list. */
    public build_list: IbuildingItem[];

    /** user_data build_Lv_list. */
    public build_Lv_list: IbuildingLevelEntry[];

    /** user_data rankLikedPlayer_list. */
    public rankLikedPlayer_list: IlikePlayer[];

    /** user_data friend_gift_list. */
    public friend_gift_list: Iplayer_full_id[];

    /**
     * Creates a new user_data instance using the specified properties.
     * @param [properties] Properties to set
     * @returns user_data instance
     */
    public static create(properties?: Iuser_data): user_data;

    /**
     * Encodes the specified user_data message. Does not implicitly {@link user_data.verify|verify} messages.
     * @param message user_data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iuser_data, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified user_data message, length delimited. Does not implicitly {@link user_data.verify|verify} messages.
     * @param message user_data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iuser_data, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a user_data message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns user_data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): user_data;

    /**
     * Decodes a user_data message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns user_data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): user_data;

    /**
     * Verifies a user_data message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a user_data message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns user_data
     */
    public static fromObject(object: { [k: string]: any }): user_data;

    /**
     * Creates a plain object from a user_data message. Also converts values to other types if specified.
     * @param message user_data
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: user_data, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this user_data to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for user_data
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an endlessRewardStatus. */
export class endlessRewardStatus implements IendlessRewardStatus {

    /**
     * Constructs a new endlessRewardStatus.
     * @param [properties] Properties to set
     */
    constructor(properties?: IendlessRewardStatus);

    /** endlessRewardStatus status. */
    public status: number;

    /**
     * Creates a new endlessRewardStatus instance using the specified properties.
     * @param [properties] Properties to set
     * @returns endlessRewardStatus instance
     */
    public static create(properties?: IendlessRewardStatus): endlessRewardStatus;

    /**
     * Encodes the specified endlessRewardStatus message. Does not implicitly {@link endlessRewardStatus.verify|verify} messages.
     * @param message endlessRewardStatus message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IendlessRewardStatus, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified endlessRewardStatus message, length delimited. Does not implicitly {@link endlessRewardStatus.verify|verify} messages.
     * @param message endlessRewardStatus message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IendlessRewardStatus, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an endlessRewardStatus message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns endlessRewardStatus
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): endlessRewardStatus;

    /**
     * Decodes an endlessRewardStatus message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns endlessRewardStatus
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): endlessRewardStatus;

    /**
     * Verifies an endlessRewardStatus message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an endlessRewardStatus message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns endlessRewardStatus
     */
    public static fromObject(object: { [k: string]: any }): endlessRewardStatus;

    /**
     * Creates a plain object from an endlessRewardStatus message. Also converts values to other types if specified.
     * @param message endlessRewardStatus
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: endlessRewardStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this endlessRewardStatus to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for endlessRewardStatus
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a moneyItemStatus. */
export class moneyItemStatus implements ImoneyItemStatus {

    /**
     * Constructs a new moneyItemStatus.
     * @param [properties] Properties to set
     */
    constructor(properties?: ImoneyItemStatus);

    /** moneyItemStatus status. */
    public status: boolean;

    /**
     * Creates a new moneyItemStatus instance using the specified properties.
     * @param [properties] Properties to set
     * @returns moneyItemStatus instance
     */
    public static create(properties?: ImoneyItemStatus): moneyItemStatus;

    /**
     * Encodes the specified moneyItemStatus message. Does not implicitly {@link moneyItemStatus.verify|verify} messages.
     * @param message moneyItemStatus message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ImoneyItemStatus, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified moneyItemStatus message, length delimited. Does not implicitly {@link moneyItemStatus.verify|verify} messages.
     * @param message moneyItemStatus message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ImoneyItemStatus, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a moneyItemStatus message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns moneyItemStatus
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): moneyItemStatus;

    /**
     * Decodes a moneyItemStatus message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns moneyItemStatus
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): moneyItemStatus;

    /**
     * Verifies a moneyItemStatus message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a moneyItemStatus message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns moneyItemStatus
     */
    public static fromObject(object: { [k: string]: any }): moneyItemStatus;

    /**
     * Creates a plain object from a moneyItemStatus message. Also converts values to other types if specified.
     * @param message moneyItemStatus
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: moneyItemStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this moneyItemStatus to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for moneyItemStatus
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a dailyItemTimes. */
export class dailyItemTimes implements IdailyItemTimes {

    /**
     * Constructs a new dailyItemTimes.
     * @param [properties] Properties to set
     */
    constructor(properties?: IdailyItemTimes);

    /** dailyItemTimes status. */
    public status: number;

    /**
     * Creates a new dailyItemTimes instance using the specified properties.
     * @param [properties] Properties to set
     * @returns dailyItemTimes instance
     */
    public static create(properties?: IdailyItemTimes): dailyItemTimes;

    /**
     * Encodes the specified dailyItemTimes message. Does not implicitly {@link dailyItemTimes.verify|verify} messages.
     * @param message dailyItemTimes message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IdailyItemTimes, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified dailyItemTimes message, length delimited. Does not implicitly {@link dailyItemTimes.verify|verify} messages.
     * @param message dailyItemTimes message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IdailyItemTimes, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a dailyItemTimes message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns dailyItemTimes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): dailyItemTimes;

    /**
     * Decodes a dailyItemTimes message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns dailyItemTimes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): dailyItemTimes;

    /**
     * Verifies a dailyItemTimes message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a dailyItemTimes message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns dailyItemTimes
     */
    public static fromObject(object: { [k: string]: any }): dailyItemTimes;

    /**
     * Creates a plain object from a dailyItemTimes message. Also converts values to other types if specified.
     * @param message dailyItemTimes
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: dailyItemTimes, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this dailyItemTimes to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for dailyItemTimes
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a weeklyItemTimes. */
export class weeklyItemTimes implements IweeklyItemTimes {

    /**
     * Constructs a new weeklyItemTimes.
     * @param [properties] Properties to set
     */
    constructor(properties?: IweeklyItemTimes);

    /** weeklyItemTimes status. */
    public status: number;

    /**
     * Creates a new weeklyItemTimes instance using the specified properties.
     * @param [properties] Properties to set
     * @returns weeklyItemTimes instance
     */
    public static create(properties?: IweeklyItemTimes): weeklyItemTimes;

    /**
     * Encodes the specified weeklyItemTimes message. Does not implicitly {@link weeklyItemTimes.verify|verify} messages.
     * @param message weeklyItemTimes message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IweeklyItemTimes, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified weeklyItemTimes message, length delimited. Does not implicitly {@link weeklyItemTimes.verify|verify} messages.
     * @param message weeklyItemTimes message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IweeklyItemTimes, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a weeklyItemTimes message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns weeklyItemTimes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): weeklyItemTimes;

    /**
     * Decodes a weeklyItemTimes message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns weeklyItemTimes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): weeklyItemTimes;

    /**
     * Verifies a weeklyItemTimes message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a weeklyItemTimes message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns weeklyItemTimes
     */
    public static fromObject(object: { [k: string]: any }): weeklyItemTimes;

    /**
     * Creates a plain object from a weeklyItemTimes message. Also converts values to other types if specified.
     * @param message weeklyItemTimes
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: weeklyItemTimes, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this weeklyItemTimes to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for weeklyItemTimes
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a monthlyItemTimes. */
export class monthlyItemTimes implements ImonthlyItemTimes {

    /**
     * Constructs a new monthlyItemTimes.
     * @param [properties] Properties to set
     */
    constructor(properties?: ImonthlyItemTimes);

    /** monthlyItemTimes times. */
    public times: number;

    /**
     * Creates a new monthlyItemTimes instance using the specified properties.
     * @param [properties] Properties to set
     * @returns monthlyItemTimes instance
     */
    public static create(properties?: ImonthlyItemTimes): monthlyItemTimes;

    /**
     * Encodes the specified monthlyItemTimes message. Does not implicitly {@link monthlyItemTimes.verify|verify} messages.
     * @param message monthlyItemTimes message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ImonthlyItemTimes, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified monthlyItemTimes message, length delimited. Does not implicitly {@link monthlyItemTimes.verify|verify} messages.
     * @param message monthlyItemTimes message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ImonthlyItemTimes, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a monthlyItemTimes message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns monthlyItemTimes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): monthlyItemTimes;

    /**
     * Decodes a monthlyItemTimes message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns monthlyItemTimes
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): monthlyItemTimes;

    /**
     * Verifies a monthlyItemTimes message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a monthlyItemTimes message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns monthlyItemTimes
     */
    public static fromObject(object: { [k: string]: any }): monthlyItemTimes;

    /**
     * Creates a plain object from a monthlyItemTimes message. Also converts values to other types if specified.
     * @param message monthlyItemTimes
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: monthlyItemTimes, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this monthlyItemTimes to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for monthlyItemTimes
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a goodsItem. */
export class goodsItem implements IgoodsItem {

    /**
     * Constructs a new goodsItem.
     * @param [properties] Properties to set
     */
    constructor(properties?: IgoodsItem);

    /** goodsItem goods_id. */
    public goods_id: number;

    /** goodsItem number. */
    public number: number;

    /**
     * Creates a new goodsItem instance using the specified properties.
     * @param [properties] Properties to set
     * @returns goodsItem instance
     */
    public static create(properties?: IgoodsItem): goodsItem;

    /**
     * Encodes the specified goodsItem message. Does not implicitly {@link goodsItem.verify|verify} messages.
     * @param message goodsItem message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IgoodsItem, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified goodsItem message, length delimited. Does not implicitly {@link goodsItem.verify|verify} messages.
     * @param message goodsItem message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IgoodsItem, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a goodsItem message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns goodsItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): goodsItem;

    /**
     * Decodes a goodsItem message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns goodsItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): goodsItem;

    /**
     * Verifies a goodsItem message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a goodsItem message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns goodsItem
     */
    public static fromObject(object: { [k: string]: any }): goodsItem;

    /**
     * Creates a plain object from a goodsItem message. Also converts values to other types if specified.
     * @param message goodsItem
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: goodsItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this goodsItem to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for goodsItem
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a furnitureAdd. */
export class furnitureAdd implements IfurnitureAdd {

    /**
     * Constructs a new furnitureAdd.
     * @param [properties] Properties to set
     */
    constructor(properties?: IfurnitureAdd);

    /** furnitureAdd furniture_name. */
    public furniture_name: string;

    /** furnitureAdd number. */
    public number: number;

    /**
     * Creates a new furnitureAdd instance using the specified properties.
     * @param [properties] Properties to set
     * @returns furnitureAdd instance
     */
    public static create(properties?: IfurnitureAdd): furnitureAdd;

    /**
     * Encodes the specified furnitureAdd message. Does not implicitly {@link furnitureAdd.verify|verify} messages.
     * @param message furnitureAdd message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IfurnitureAdd, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified furnitureAdd message, length delimited. Does not implicitly {@link furnitureAdd.verify|verify} messages.
     * @param message furnitureAdd message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IfurnitureAdd, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a furnitureAdd message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns furnitureAdd
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): furnitureAdd;

    /**
     * Decodes a furnitureAdd message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns furnitureAdd
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): furnitureAdd;

    /**
     * Verifies a furnitureAdd message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a furnitureAdd message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns furnitureAdd
     */
    public static fromObject(object: { [k: string]: any }): furnitureAdd;

    /**
     * Creates a plain object from a furnitureAdd message. Also converts values to other types if specified.
     * @param message furnitureAdd
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: furnitureAdd, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this furnitureAdd to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for furnitureAdd
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an unlockBuild. */
export class unlockBuild implements IunlockBuild {

    /**
     * Constructs a new unlockBuild.
     * @param [properties] Properties to set
     */
    constructor(properties?: IunlockBuild);

    /** unlockBuild lock. */
    public lock: boolean;

    /**
     * Creates a new unlockBuild instance using the specified properties.
     * @param [properties] Properties to set
     * @returns unlockBuild instance
     */
    public static create(properties?: IunlockBuild): unlockBuild;

    /**
     * Encodes the specified unlockBuild message. Does not implicitly {@link unlockBuild.verify|verify} messages.
     * @param message unlockBuild message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IunlockBuild, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified unlockBuild message, length delimited. Does not implicitly {@link unlockBuild.verify|verify} messages.
     * @param message unlockBuild message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IunlockBuild, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an unlockBuild message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns unlockBuild
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): unlockBuild;

    /**
     * Decodes an unlockBuild message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns unlockBuild
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): unlockBuild;

    /**
     * Verifies an unlockBuild message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an unlockBuild message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns unlockBuild
     */
    public static fromObject(object: { [k: string]: any }): unlockBuild;

    /**
     * Creates a plain object from an unlockBuild message. Also converts values to other types if specified.
     * @param message unlockBuild
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: unlockBuild, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this unlockBuild to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for unlockBuild
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a debrisItem. */
export class debrisItem implements IdebrisItem {

    /**
     * Constructs a new debrisItem.
     * @param [properties] Properties to set
     */
    constructor(properties?: IdebrisItem);

    /** debrisItem debris_id. */
    public debris_id: number;

    /** debrisItem count. */
    public count: number;

    /**
     * Creates a new debrisItem instance using the specified properties.
     * @param [properties] Properties to set
     * @returns debrisItem instance
     */
    public static create(properties?: IdebrisItem): debrisItem;

    /**
     * Encodes the specified debrisItem message. Does not implicitly {@link debrisItem.verify|verify} messages.
     * @param message debrisItem message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IdebrisItem, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified debrisItem message, length delimited. Does not implicitly {@link debrisItem.verify|verify} messages.
     * @param message debrisItem message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IdebrisItem, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a debrisItem message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns debrisItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): debrisItem;

    /**
     * Decodes a debrisItem message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns debrisItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): debrisItem;

    /**
     * Verifies a debrisItem message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a debrisItem message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns debrisItem
     */
    public static fromObject(object: { [k: string]: any }): debrisItem;

    /**
     * Creates a plain object from a debrisItem message. Also converts values to other types if specified.
     * @param message debrisItem
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: debrisItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this debrisItem to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for debrisItem
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a towerLvItem. */
export class towerLvItem implements ItowerLvItem {

    /**
     * Constructs a new towerLvItem.
     * @param [properties] Properties to set
     */
    constructor(properties?: ItowerLvItem);

    /** towerLvItem tower_id. */
    public tower_id: number;

    /** towerLvItem lv. */
    public lv: number;

    /**
     * Creates a new towerLvItem instance using the specified properties.
     * @param [properties] Properties to set
     * @returns towerLvItem instance
     */
    public static create(properties?: ItowerLvItem): towerLvItem;

    /**
     * Encodes the specified towerLvItem message. Does not implicitly {@link towerLvItem.verify|verify} messages.
     * @param message towerLvItem message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ItowerLvItem, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified towerLvItem message, length delimited. Does not implicitly {@link towerLvItem.verify|verify} messages.
     * @param message towerLvItem message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ItowerLvItem, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a towerLvItem message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns towerLvItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): towerLvItem;

    /**
     * Decodes a towerLvItem message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns towerLvItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): towerLvItem;

    /**
     * Verifies a towerLvItem message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a towerLvItem message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns towerLvItem
     */
    public static fromObject(object: { [k: string]: any }): towerLvItem;

    /**
     * Creates a plain object from a towerLvItem message. Also converts values to other types if specified.
     * @param message towerLvItem
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: towerLvItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this towerLvItem to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for towerLvItem
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents an employee. */
export class employee implements Iemployee {

    /**
     * Constructs a new employee.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iemployee);

    /** employee id. */
    public id: number;

    /** employee name. */
    public name: string;

    /** employee english_name. */
    public english_name: string;

    /** employee hurttype. */
    public hurttype: string;

    /** employee staff_type_id. */
    public staff_type_id: number;

    /** employee quality. */
    public quality: number;

    /** employee max_lv. */
    public max_lv: number;

    /** employee piece_goods_id. */
    public piece_goods_id: number;

    /** employee icon_id. */
    public icon_id: number;

    /** employee draw_id. */
    public draw_id: number;

    /** employee voice_id. */
    public voice_id: number;

    /** employee pub_id. */
    public pub_id: number;

    /** employee spine_id. */
    public spine_id: string;

    /** employee idle_id. */
    public idle_id: string;

    /** employee attack_id. */
    public attack_id: string;

    /** employee atk. */
    public atk: number;

    /** employee atk_base. */
    public atk_base: number;

    /** employee atk_grow. */
    public atk_grow: number;

    /** employee bullet_spd. */
    public bullet_spd: number;

    /** employee atk_spd. */
    public atk_spd: number;

    /** employee range. */
    public range: number;

    /** employee radius. */
    public radius: number;

    /** employee crit. */
    public crit: number;

    /** employee crit_hurt. */
    public crit_hurt: number;

    /** employee poison. */
    public poison: number;

    /** employee poison_base. */
    public poison_base: number;

    /** employee poi_grow. */
    public poi_grow: number;

    /** employee duration. */
    public duration: number;

    /** employee slow. */
    public slow: number;

    /** employee slow_time. */
    public slow_time: number;

    /** employee is_return. */
    public is_return: number;

    /** employee build_id. */
    public build_id: number;

    /** employee introduce. */
    public introduce: string;

    /**
     * Creates a new employee instance using the specified properties.
     * @param [properties] Properties to set
     * @returns employee instance
     */
    public static create(properties?: Iemployee): employee;

    /**
     * Encodes the specified employee message. Does not implicitly {@link employee.verify|verify} messages.
     * @param message employee message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iemployee, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified employee message, length delimited. Does not implicitly {@link employee.verify|verify} messages.
     * @param message employee message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iemployee, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an employee message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns employee
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): employee;

    /**
     * Decodes an employee message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns employee
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): employee;

    /**
     * Verifies an employee message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an employee message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns employee
     */
    public static fromObject(object: { [k: string]: any }): employee;

    /**
     * Creates a plain object from an employee message. Also converts values to other types if specified.
     * @param message employee
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: employee, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this employee to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for employee
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a buildingItem. */
export class buildingItem implements IbuildingItem {

    /**
     * Constructs a new buildingItem.
     * @param [properties] Properties to set
     */
    constructor(properties?: IbuildingItem);

    /** buildingItem build_id. */
    public build_id: number;

    /** buildingItem build_lv. */
    public build_lv: number;

    /**
     * Creates a new buildingItem instance using the specified properties.
     * @param [properties] Properties to set
     * @returns buildingItem instance
     */
    public static create(properties?: IbuildingItem): buildingItem;

    /**
     * Encodes the specified buildingItem message. Does not implicitly {@link buildingItem.verify|verify} messages.
     * @param message buildingItem message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IbuildingItem, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified buildingItem message, length delimited. Does not implicitly {@link buildingItem.verify|verify} messages.
     * @param message buildingItem message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IbuildingItem, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a buildingItem message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns buildingItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): buildingItem;

    /**
     * Decodes a buildingItem message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns buildingItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): buildingItem;

    /**
     * Verifies a buildingItem message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a buildingItem message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns buildingItem
     */
    public static fromObject(object: { [k: string]: any }): buildingItem;

    /**
     * Creates a plain object from a buildingItem message. Also converts values to other types if specified.
     * @param message buildingItem
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: buildingItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this buildingItem to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for buildingItem
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a buildingLevelEntry. */
export class buildingLevelEntry implements IbuildingLevelEntry {

    /**
     * Constructs a new buildingLevelEntry.
     * @param [properties] Properties to set
     */
    constructor(properties?: IbuildingLevelEntry);

    /** buildingLevelEntry building_id. */
    public building_id: number;

    /** buildingLevelEntry level_list. */
    public level_list: number[];

    /**
     * Creates a new buildingLevelEntry instance using the specified properties.
     * @param [properties] Properties to set
     * @returns buildingLevelEntry instance
     */
    public static create(properties?: IbuildingLevelEntry): buildingLevelEntry;

    /**
     * Encodes the specified buildingLevelEntry message. Does not implicitly {@link buildingLevelEntry.verify|verify} messages.
     * @param message buildingLevelEntry message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IbuildingLevelEntry, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified buildingLevelEntry message, length delimited. Does not implicitly {@link buildingLevelEntry.verify|verify} messages.
     * @param message buildingLevelEntry message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IbuildingLevelEntry, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a buildingLevelEntry message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns buildingLevelEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): buildingLevelEntry;

    /**
     * Decodes a buildingLevelEntry message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns buildingLevelEntry
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): buildingLevelEntry;

    /**
     * Verifies a buildingLevelEntry message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a buildingLevelEntry message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns buildingLevelEntry
     */
    public static fromObject(object: { [k: string]: any }): buildingLevelEntry;

    /**
     * Creates a plain object from a buildingLevelEntry message. Also converts values to other types if specified.
     * @param message buildingLevelEntry
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: buildingLevelEntry, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this buildingLevelEntry to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for buildingLevelEntry
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a likePlayer. */
export class likePlayer implements IlikePlayer {

    /**
     * Constructs a new likePlayer.
     * @param [properties] Properties to set
     */
    constructor(properties?: IlikePlayer);

    /** likePlayer rank_id. */
    public rank_id: number;

    /** likePlayer player_id. */
    public player_id: number;

    /**
     * Creates a new likePlayer instance using the specified properties.
     * @param [properties] Properties to set
     * @returns likePlayer instance
     */
    public static create(properties?: IlikePlayer): likePlayer;

    /**
     * Encodes the specified likePlayer message. Does not implicitly {@link likePlayer.verify|verify} messages.
     * @param message likePlayer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IlikePlayer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified likePlayer message, length delimited. Does not implicitly {@link likePlayer.verify|verify} messages.
     * @param message likePlayer message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IlikePlayer, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a likePlayer message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns likePlayer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): likePlayer;

    /**
     * Decodes a likePlayer message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns likePlayer
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): likePlayer;

    /**
     * Verifies a likePlayer message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a likePlayer message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns likePlayer
     */
    public static fromObject(object: { [k: string]: any }): likePlayer;

    /**
     * Creates a plain object from a likePlayer message. Also converts values to other types if specified.
     * @param message likePlayer
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: likePlayer, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this likePlayer to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for likePlayer
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a task_data. */
export class task_data implements Itask_data {

    /**
     * Constructs a new task_data.
     * @param [properties] Properties to set
     */
    constructor(properties?: Itask_data);

    /** task_data continuousTaskId. */
    public continuousTaskId: number;

    /** task_data continueTaskTimes_list. */
    public continueTaskTimes_list: number[];

    /** task_data dailyTaskStatus_list. */
    public dailyTaskStatus_list: number[];

    /** task_data dailyTaskTimes_list. */
    public dailyTaskTimes_list: number[];

    /**
     * Creates a new task_data instance using the specified properties.
     * @param [properties] Properties to set
     * @returns task_data instance
     */
    public static create(properties?: Itask_data): task_data;

    /**
     * Encodes the specified task_data message. Does not implicitly {@link task_data.verify|verify} messages.
     * @param message task_data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Itask_data, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified task_data message, length delimited. Does not implicitly {@link task_data.verify|verify} messages.
     * @param message task_data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Itask_data, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a task_data message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns task_data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): task_data;

    /**
     * Decodes a task_data message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns task_data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): task_data;

    /**
     * Verifies a task_data message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a task_data message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns task_data
     */
    public static fromObject(object: { [k: string]: any }): task_data;

    /**
     * Creates a plain object from a task_data message. Also converts values to other types if specified.
     * @param message task_data
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: task_data, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this task_data to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for task_data
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a battle_data. */
export class battle_data implements Ibattle_data {

    /**
     * Constructs a new battle_data.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ibattle_data);

    /** battle_data towerObj_list. */
    public towerObj_list: Iemployee[];

    /** battle_data waitTower_list. */
    public waitTower_list: Iemployee[];

    /** battle_data boxReward_list. */
    public boxReward_list: IboxRewardItem[];

    /**
     * Creates a new battle_data instance using the specified properties.
     * @param [properties] Properties to set
     * @returns battle_data instance
     */
    public static create(properties?: Ibattle_data): battle_data;

    /**
     * Encodes the specified battle_data message. Does not implicitly {@link battle_data.verify|verify} messages.
     * @param message battle_data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ibattle_data, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified battle_data message, length delimited. Does not implicitly {@link battle_data.verify|verify} messages.
     * @param message battle_data message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ibattle_data, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a battle_data message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns battle_data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): battle_data;

    /**
     * Decodes a battle_data message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns battle_data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): battle_data;

    /**
     * Verifies a battle_data message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a battle_data message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns battle_data
     */
    public static fromObject(object: { [k: string]: any }): battle_data;

    /**
     * Creates a plain object from a battle_data message. Also converts values to other types if specified.
     * @param message battle_data
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: battle_data, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this battle_data to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for battle_data
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a boxRewardItem. */
export class boxRewardItem implements IboxRewardItem {

    /**
     * Constructs a new boxRewardItem.
     * @param [properties] Properties to set
     */
    constructor(properties?: IboxRewardItem);

    /** boxRewardItem reward. */
    public reward: number;

    /** boxRewardItem number. */
    public number: number;

    /**
     * Creates a new boxRewardItem instance using the specified properties.
     * @param [properties] Properties to set
     * @returns boxRewardItem instance
     */
    public static create(properties?: IboxRewardItem): boxRewardItem;

    /**
     * Encodes the specified boxRewardItem message. Does not implicitly {@link boxRewardItem.verify|verify} messages.
     * @param message boxRewardItem message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IboxRewardItem, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified boxRewardItem message, length delimited. Does not implicitly {@link boxRewardItem.verify|verify} messages.
     * @param message boxRewardItem message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IboxRewardItem, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a boxRewardItem message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns boxRewardItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): boxRewardItem;

    /**
     * Decodes a boxRewardItem message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns boxRewardItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): boxRewardItem;

    /**
     * Verifies a boxRewardItem message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a boxRewardItem message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns boxRewardItem
     */
    public static fromObject(object: { [k: string]: any }): boxRewardItem;

    /**
     * Creates a plain object from a boxRewardItem message. Also converts values to other types if specified.
     * @param message boxRewardItem
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: boxRewardItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this boxRewardItem to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for boxRewardItem
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_100. */
export class query_100 implements Iquery_100 {

    /**
     * Constructs a new query_100.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_100);

    /**
     * Creates a new query_100 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_100 instance
     */
    public static create(properties?: Iquery_100): query_100;

    /**
     * Encodes the specified query_100 message. Does not implicitly {@link query_100.verify|verify} messages.
     * @param message query_100 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_100, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_100 message, length delimited. Does not implicitly {@link query_100.verify|verify} messages.
     * @param message query_100 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_100, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_100 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_100
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_100;

    /**
     * Decodes a query_100 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_100
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_100;

    /**
     * Verifies a query_100 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_100 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_100
     */
    public static fromObject(object: { [k: string]: any }): query_100;

    /**
     * Creates a plain object from a query_100 message. Also converts values to other types if specified.
     * @param message query_100
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_100, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_100 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_100
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_100. */
export class reply_100 implements Ireply_100 {

    /**
     * Constructs a new reply_100.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_100);

    /** reply_100 time. */
    public time: (number|Long);

    /**
     * Creates a new reply_100 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_100 instance
     */
    public static create(properties?: Ireply_100): reply_100;

    /**
     * Encodes the specified reply_100 message. Does not implicitly {@link reply_100.verify|verify} messages.
     * @param message reply_100 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_100, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_100 message, length delimited. Does not implicitly {@link reply_100.verify|verify} messages.
     * @param message reply_100 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_100, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_100 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_100
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_100;

    /**
     * Decodes a reply_100 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_100
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_100;

    /**
     * Verifies a reply_100 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_100 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_100
     */
    public static fromObject(object: { [k: string]: any }): reply_100;

    /**
     * Creates a plain object from a reply_100 message. Also converts values to other types if specified.
     * @param message reply_100
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_100, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_100 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_100
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_101. */
export class query_101 implements Iquery_101 {

    /**
     * Constructs a new query_101.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_101);

    /** query_101 account. */
    public account: string;

    /** query_101 timestamp. */
    public timestamp: number;

    /** query_101 sign. */
    public sign: string;

    /** query_101 check_guid_key. */
    public check_guid_key: string;

    /**
     * Creates a new query_101 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_101 instance
     */
    public static create(properties?: Iquery_101): query_101;

    /**
     * Encodes the specified query_101 message. Does not implicitly {@link query_101.verify|verify} messages.
     * @param message query_101 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_101, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_101 message, length delimited. Does not implicitly {@link query_101.verify|verify} messages.
     * @param message query_101 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_101, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_101 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_101
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_101;

    /**
     * Decodes a query_101 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_101
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_101;

    /**
     * Verifies a query_101 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_101 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_101
     */
    public static fromObject(object: { [k: string]: any }): query_101;

    /**
     * Creates a plain object from a query_101 message. Also converts values to other types if specified.
     * @param message query_101
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_101, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_101 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_101
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_101. */
export class reply_101 implements Ireply_101 {

    /**
     * Constructs a new reply_101.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_101);

    /** reply_101 status. */
    public status: number;

    /** reply_101 message. */
    public message: string;

    /** reply_101 player_to_login_list. */
    public player_to_login_list: Iplayer_to_login_list[];

    /**
     * Creates a new reply_101 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_101 instance
     */
    public static create(properties?: Ireply_101): reply_101;

    /**
     * Encodes the specified reply_101 message. Does not implicitly {@link reply_101.verify|verify} messages.
     * @param message reply_101 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_101, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_101 message, length delimited. Does not implicitly {@link reply_101.verify|verify} messages.
     * @param message reply_101 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_101, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_101 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_101
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_101;

    /**
     * Decodes a reply_101 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_101
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_101;

    /**
     * Verifies a reply_101 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_101 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_101
     */
    public static fromObject(object: { [k: string]: any }): reply_101;

    /**
     * Creates a plain object from a reply_101 message. Also converts values to other types if specified.
     * @param message reply_101
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_101, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_101 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_101
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a player_to_login_list. */
export class player_to_login_list implements Iplayer_to_login_list {

    /**
     * Constructs a new player_to_login_list.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iplayer_to_login_list);

    /** player_to_login_list player_id. */
    public player_id: number;

    /** player_to_login_list srvno. */
    public srvno: string;

    /** player_to_login_list nickname. */
    public nickname: string;

    /** player_to_login_list lev. */
    public lev: number;

    /** player_to_login_list head_id. */
    public head_id: number;

    /**
     * Creates a new player_to_login_list instance using the specified properties.
     * @param [properties] Properties to set
     * @returns player_to_login_list instance
     */
    public static create(properties?: Iplayer_to_login_list): player_to_login_list;

    /**
     * Encodes the specified player_to_login_list message. Does not implicitly {@link player_to_login_list.verify|verify} messages.
     * @param message player_to_login_list message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iplayer_to_login_list, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified player_to_login_list message, length delimited. Does not implicitly {@link player_to_login_list.verify|verify} messages.
     * @param message player_to_login_list message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iplayer_to_login_list, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a player_to_login_list message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns player_to_login_list
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): player_to_login_list;

    /**
     * Decodes a player_to_login_list message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns player_to_login_list
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): player_to_login_list;

    /**
     * Verifies a player_to_login_list message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a player_to_login_list message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns player_to_login_list
     */
    public static fromObject(object: { [k: string]: any }): player_to_login_list;

    /**
     * Creates a plain object from a player_to_login_list message. Also converts values to other types if specified.
     * @param message player_to_login_list
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: player_to_login_list, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this player_to_login_list to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for player_to_login_list
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_102. */
export class query_102 implements Iquery_102 {

    /**
     * Constructs a new query_102.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_102);

    /** query_102 device_type. */
    public device_type: string;

    /** query_102 device_id. */
    public device_id: string;

    /** query_102 device_code. */
    public device_code: string;

    /** query_102 app_name. */
    public app_name: string;

    /** query_102 package_name. */
    public package_name: string;

    /** query_102 package_version. */
    public package_version: string;

    /** query_102 os_name. */
    public os_name: string;

    /** query_102 os_ver. */
    public os_ver: string;

    /** query_102 resolution. */
    public resolution: string;

    /** query_102 carrier_name. */
    public carrier_name: string;

    /** query_102 network_name. */
    public network_name: string;

    /**
     * Creates a new query_102 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_102 instance
     */
    public static create(properties?: Iquery_102): query_102;

    /**
     * Encodes the specified query_102 message. Does not implicitly {@link query_102.verify|verify} messages.
     * @param message query_102 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_102, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_102 message, length delimited. Does not implicitly {@link query_102.verify|verify} messages.
     * @param message query_102 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_102, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_102 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_102
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_102;

    /**
     * Decodes a query_102 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_102
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_102;

    /**
     * Verifies a query_102 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_102 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_102
     */
    public static fromObject(object: { [k: string]: any }): query_102;

    /**
     * Creates a plain object from a query_102 message. Also converts values to other types if specified.
     * @param message query_102
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_102, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_102 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_102
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_102. */
export class reply_102 implements Ireply_102 {

    /**
     * Constructs a new reply_102.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_102);

    /** reply_102 status. */
    public status: number;

    /** reply_102 message. */
    public message: string;

    /** reply_102 player_id. */
    public player_id: number;

    /** reply_102 srvno. */
    public srvno: string;

    /** reply_102 nickname. */
    public nickname: string;

    /**
     * Creates a new reply_102 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_102 instance
     */
    public static create(properties?: Ireply_102): reply_102;

    /**
     * Encodes the specified reply_102 message. Does not implicitly {@link reply_102.verify|verify} messages.
     * @param message reply_102 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_102, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_102 message, length delimited. Does not implicitly {@link reply_102.verify|verify} messages.
     * @param message reply_102 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_102, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_102 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_102
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_102;

    /**
     * Decodes a reply_102 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_102
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_102;

    /**
     * Verifies a reply_102 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_102 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_102
     */
    public static fromObject(object: { [k: string]: any }): reply_102;

    /**
     * Creates a plain object from a reply_102 message. Also converts values to other types if specified.
     * @param message reply_102
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_102, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_102 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_102
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_103. */
export class query_103 implements Iquery_103 {

    /**
     * Constructs a new query_103.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_103);

    /** query_103 player_id. */
    public player_id: number;

    /** query_103 srvno. */
    public srvno: string;

    /** query_103 device_type. */
    public device_type: string;

    /** query_103 device_id. */
    public device_id: string;

    /** query_103 device_code. */
    public device_code: string;

    /** query_103 app_name. */
    public app_name: string;

    /** query_103 package_name. */
    public package_name: string;

    /** query_103 package_version. */
    public package_version: string;

    /** query_103 os_name. */
    public os_name: string;

    /** query_103 os_ver. */
    public os_ver: string;

    /** query_103 resolution. */
    public resolution: string;

    /** query_103 carrier_name. */
    public carrier_name: string;

    /** query_103 network. */
    public network: string;

    /**
     * Creates a new query_103 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_103 instance
     */
    public static create(properties?: Iquery_103): query_103;

    /**
     * Encodes the specified query_103 message. Does not implicitly {@link query_103.verify|verify} messages.
     * @param message query_103 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_103, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_103 message, length delimited. Does not implicitly {@link query_103.verify|verify} messages.
     * @param message query_103 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_103, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_103 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_103
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_103;

    /**
     * Decodes a query_103 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_103
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_103;

    /**
     * Verifies a query_103 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_103 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_103
     */
    public static fromObject(object: { [k: string]: any }): query_103;

    /**
     * Creates a plain object from a query_103 message. Also converts values to other types if specified.
     * @param message query_103
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_103, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_103 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_103
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_103. */
export class reply_103 implements Ireply_103 {

    /**
     * Constructs a new reply_103.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_103);

    /** reply_103 status. */
    public status: number;

    /** reply_103 message. */
    public message: string;

    /**
     * Creates a new reply_103 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_103 instance
     */
    public static create(properties?: Ireply_103): reply_103;

    /**
     * Encodes the specified reply_103 message. Does not implicitly {@link reply_103.verify|verify} messages.
     * @param message reply_103 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_103, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_103 message, length delimited. Does not implicitly {@link reply_103.verify|verify} messages.
     * @param message reply_103 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_103, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_103 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_103
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_103;

    /**
     * Decodes a reply_103 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_103
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_103;

    /**
     * Verifies a reply_103 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_103 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_103
     */
    public static fromObject(object: { [k: string]: any }): reply_103;

    /**
     * Creates a plain object from a reply_103 message. Also converts values to other types if specified.
     * @param message reply_103
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_103, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_103 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_103
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a rank_sub. */
export class rank_sub implements Irank_sub {

    /**
     * Constructs a new rank_sub.
     * @param [properties] Properties to set
     */
    constructor(properties?: Irank_sub);

    /** rank_sub version. */
    public version: number;

    /** rank_sub rank_id. */
    public rank_id: number;

    /** rank_sub num. */
    public num: number;

    /** rank_sub last_value. */
    public last_value: number;

    /** rank_sub rank_item_list. */
    public rank_item_list: Irank_item[];

    /** rank_sub time. */
    public time: number;

    /**
     * Creates a new rank_sub instance using the specified properties.
     * @param [properties] Properties to set
     * @returns rank_sub instance
     */
    public static create(properties?: Irank_sub): rank_sub;

    /**
     * Encodes the specified rank_sub message. Does not implicitly {@link rank_sub.verify|verify} messages.
     * @param message rank_sub message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Irank_sub, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified rank_sub message, length delimited. Does not implicitly {@link rank_sub.verify|verify} messages.
     * @param message rank_sub message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Irank_sub, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a rank_sub message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns rank_sub
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rank_sub;

    /**
     * Decodes a rank_sub message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns rank_sub
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rank_sub;

    /**
     * Verifies a rank_sub message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a rank_sub message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns rank_sub
     */
    public static fromObject(object: { [k: string]: any }): rank_sub;

    /**
     * Creates a plain object from a rank_sub message. Also converts values to other types if specified.
     * @param message rank_sub
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: rank_sub, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this rank_sub to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for rank_sub
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a rank_item. */
export class rank_item implements Irank_item {

    /**
     * Constructs a new rank_item.
     * @param [properties] Properties to set
     */
    constructor(properties?: Irank_item);

    /** rank_item rank. */
    public rank: number;

    /** rank_item value1. */
    public value1: number;

    /** rank_item value2. */
    public value2: number;

    /** rank_item value3. */
    public value3: number;

    /** rank_item support. */
    public support: number;

    /** rank_item time_stamp. */
    public time_stamp: number;

    /** rank_item player_full_id. */
    public player_full_id?: (Iplayer_full_id|null);

    /** rank_item other_player. */
    public other_player?: (Iother_player|null);

    /** rank_item guild_guid. */
    public guild_guid: string;

    /**
     * Creates a new rank_item instance using the specified properties.
     * @param [properties] Properties to set
     * @returns rank_item instance
     */
    public static create(properties?: Irank_item): rank_item;

    /**
     * Encodes the specified rank_item message. Does not implicitly {@link rank_item.verify|verify} messages.
     * @param message rank_item message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Irank_item, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified rank_item message, length delimited. Does not implicitly {@link rank_item.verify|verify} messages.
     * @param message rank_item message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Irank_item, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a rank_item message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns rank_item
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rank_item;

    /**
     * Decodes a rank_item message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns rank_item
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rank_item;

    /**
     * Verifies a rank_item message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a rank_item message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns rank_item
     */
    public static fromObject(object: { [k: string]: any }): rank_item;

    /**
     * Creates a plain object from a rank_item message. Also converts values to other types if specified.
     * @param message rank_item
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: rank_item, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this rank_item to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for rank_item
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a query_5901. */
export class query_5901 implements Iquery_5901 {

    /**
     * Constructs a new query_5901.
     * @param [properties] Properties to set
     */
    constructor(properties?: Iquery_5901);

    /** query_5901 rank_id. */
    public rank_id: number;

    /** query_5901 page. */
    public page: number;

    /** query_5901 num. */
    public num: number;

    /**
     * Creates a new query_5901 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns query_5901 instance
     */
    public static create(properties?: Iquery_5901): query_5901;

    /**
     * Encodes the specified query_5901 message. Does not implicitly {@link query_5901.verify|verify} messages.
     * @param message query_5901 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Iquery_5901, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified query_5901 message, length delimited. Does not implicitly {@link query_5901.verify|verify} messages.
     * @param message query_5901 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Iquery_5901, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a query_5901 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns query_5901
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): query_5901;

    /**
     * Decodes a query_5901 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns query_5901
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): query_5901;

    /**
     * Verifies a query_5901 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a query_5901 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns query_5901
     */
    public static fromObject(object: { [k: string]: any }): query_5901;

    /**
     * Creates a plain object from a query_5901 message. Also converts values to other types if specified.
     * @param message query_5901
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: query_5901, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this query_5901 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for query_5901
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Represents a reply_5901. */
export class reply_5901 implements Ireply_5901 {

    /**
     * Constructs a new reply_5901.
     * @param [properties] Properties to set
     */
    constructor(properties?: Ireply_5901);

    /** reply_5901 status. */
    public status: number;

    /** reply_5901 message. */
    public message: string;

    /** reply_5901 rank_id. */
    public rank_id: number;

    /** reply_5901 my_rank. */
    public my_rank?: (Irank_item|null);

    /** reply_5901 sub_rank. */
    public sub_rank?: (Irank_sub|null);

    /**
     * Creates a new reply_5901 instance using the specified properties.
     * @param [properties] Properties to set
     * @returns reply_5901 instance
     */
    public static create(properties?: Ireply_5901): reply_5901;

    /**
     * Encodes the specified reply_5901 message. Does not implicitly {@link reply_5901.verify|verify} messages.
     * @param message reply_5901 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: Ireply_5901, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified reply_5901 message, length delimited. Does not implicitly {@link reply_5901.verify|verify} messages.
     * @param message reply_5901 message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: Ireply_5901, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a reply_5901 message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns reply_5901
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): reply_5901;

    /**
     * Decodes a reply_5901 message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns reply_5901
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): reply_5901;

    /**
     * Verifies a reply_5901 message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a reply_5901 message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns reply_5901
     */
    public static fromObject(object: { [k: string]: any }): reply_5901;

    /**
     * Creates a plain object from a reply_5901 message. Also converts values to other types if specified.
     * @param message reply_5901
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: reply_5901, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this reply_5901 to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for reply_5901
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

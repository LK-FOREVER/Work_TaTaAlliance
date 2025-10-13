/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : game_db

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 07/04/2023 15:50:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for player
-- ----------------------------
DROP TABLE IF EXISTS `player`;
CREATE TABLE `player`  (
  `player_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `account` char(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '帐号',
  `nickname` char(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色昵称',
  `ref_code` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '自己的推荐码',
  `designation` int(11) NOT NULL COMMENT '称号',
  `sex` tinyint(4) NOT NULL DEFAULT 0 COMMENT '性别',
  `lv` smallint(6) NOT NULL DEFAULT 1 COMMENT '等级',
  `exp` bigint(255) NOT NULL DEFAULT 0 COMMENT '经验',
  `id_banned_time` int(11) NOT NULL DEFAULT 0 COMMENT '账号封禁截止时间 0为不封号',
  `last_login_time` int(11) NOT NULL DEFAULT 0 COMMENT '上次登录时间',
  `last_login_ip` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '上次登录ip',
  `reg_time` int(11) NOT NULL DEFAULT 0 COMMENT '注册时间',
  `reg_ip` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '注册ip',
  PRIMARY KEY (`player_id`) USING BTREE,
  UNIQUE INDEX `nickname`(`nickname`) USING BTREE,
  INDEX `account`(`account`) USING BTREE,
  INDEX `last_login_ip`(`last_login_ip`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '角色数据' ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;

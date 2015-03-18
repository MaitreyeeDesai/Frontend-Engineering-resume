-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema yelp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema yelp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `yelp` DEFAULT CHARACTER SET utf8 ;
USE `yelp` ;

-- -----------------------------------------------------
-- Table `yelp`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yelp`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `fname` VARCHAR(45) NOT NULL,
  `lname` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `lastlogin` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `Username_UNIQUE` (`username` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `yelp`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yelp`.`categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `yelp`.`bussiness`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yelp`.`bussiness` (
  `bid` INT(11) NOT NULL AUTO_INCREMENT,
  `bname` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `neiborhood` VARCHAR(45) NULL DEFAULT NULL,
  `category` INT(11) NOT NULL,
  PRIMARY KEY (`bid`),
  UNIQUE INDEX `bussines_name_UNIQUE` (`bname` ASC),
  INDEX `categoryReference_idx` (`category` ASC),
  CONSTRAINT `categoryRef`
    FOREIGN KEY (`category`)
    REFERENCES `yelp`.`categories` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `yelp`.`business_reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `yelp`.`business_reviews` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `author` INT(11) NULL DEFAULT NULL,
  `business` INT(11) NULL DEFAULT NULL,
  `review` VARCHAR(255) NOT NULL,
  `rating` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `authorReference_idx` (`author` ASC),
  INDEX `businessRefer_idx` (`business` ASC),
  CONSTRAINT `authorReference`
    FOREIGN KEY (`author`)
    REFERENCES `yelp`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE SET NULL,
  CONSTRAINT `businessReference`
    FOREIGN KEY (`business`)
    REFERENCES `yelp`.`bussiness` (`bid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

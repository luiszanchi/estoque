import { Module } from "@nestjs/common";
import { databaseProviders } from "./providers/databaseProvider";

@Module({
  providers: [
    ...databaseProviders
  ],
  exports: [
    ...databaseProviders
  ]
})

export class DatabaseModule {}
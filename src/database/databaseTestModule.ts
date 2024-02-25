import { Module } from "@nestjs/common";
import { databaseTestProviders } from "./providers/databaseTestProvider";

@Module({
  providers: [
    ...databaseTestProviders
  ],
  exports: [
    ...databaseTestProviders
  ]
})

export class DatabaseTestModule {}